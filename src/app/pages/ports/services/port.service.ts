import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

// Interfaces
export interface Port {
  id?: number;
  name: string;
  address: string;
  countryId: number;
  countryName?: string;
  cityId: number;
  cityName?: string;
}

export interface CreatePortRequest {
  name: string;
  address: string;
  countryId: number;
  cityId: number;
}

export interface UpdatePortRequest {
  id: number;
  name: string;
  address: string;
  countryId: number;
  cityId: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
  pageIndex: number;
  first: boolean;
  last: boolean;
}

export interface SearchParams {
  searchText?: string;
  columnName?: string;
}

export interface SortParams {
  active: string;
  direction: 'asc' | 'desc' | '';
}

export interface PageParams {
  pageIndex: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  status: number;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PortService {
  private readonly apiUrl = `http://localhost:8081/api/v1/ports/all`
  private portsSubject = new BehaviorSubject<Port[]>([]);
  public ports$ = this.portsSubject.asObservable();
  private allPorts: Port[] = []; // Store all ports for local filtering/pagination

  constructor(private http: HttpClient) {}

  /**
   * Fetch all ports from backend and handle pagination/search/sorting locally
   */
  getPorts(
    pageParams?: PageParams,
    searchParams?: SearchParams,
    sortParams?: SortParams
  ): Observable<PaginatedResponse<Port>> {
    // First, get all ports from the backend
    return this.http.get<Port[]>(`${this.apiUrl}`).pipe(
      tap(ports => {
        // Store all ports locally
        this.allPorts = ports;
        this.portsSubject.next(ports);
      }),
      map(ports => {
        // Apply local filtering, sorting, and pagination
        let filteredPorts = [...ports];

        // Apply search filter
        if (searchParams && searchParams.searchText) {
          const searchText = searchParams.searchText.toLowerCase();
          filteredPorts = filteredPorts.filter(port => {
            if (searchParams.columnName) {
              // Search in specific column
              const value = this.getNestedValue(port, searchParams.columnName);
              return value?.toString().toLowerCase().includes(searchText);
            } else {
              // Search in all columns
              return (
                port.name.toLowerCase().includes(searchText) ||
                port.address.toLowerCase().includes(searchText) ||
                port.countryName?.toLowerCase().includes(searchText) ||
                port.cityName?.toLowerCase().includes(searchText)
              );
            }
          });
        }

        // Apply sorting
        if (sortParams && sortParams.active && sortParams.direction) {
          filteredPorts.sort((a, b) => {
            const aValue = this.getNestedValue(a, sortParams.active) || '';
            const bValue = this.getNestedValue(b, sortParams.active) || '';
            
            let comparison = 0;
            if (aValue > bValue) comparison = 1;
            if (aValue < bValue) comparison = -1;
            
            return sortParams.direction === 'desc' ? -comparison : comparison;
          });
        }

        // Apply pagination
        const pageSize = pageParams?.pageSize || 10;
        const pageIndex = pageParams?.pageIndex || 0;
        const startIndex = pageIndex * pageSize;
        const paginatedPorts = filteredPorts.slice(startIndex, startIndex + pageSize);

        // Return paginated response
        return {
          content: paginatedPorts,
          totalElements: filteredPorts.length,
          totalPages: Math.ceil(filteredPorts.length / pageSize),
          pageSize,
          pageIndex,
          first: pageIndex === 0,
          last: pageIndex >= Math.ceil(filteredPorts.length / pageSize) - 1
        };
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Get a single port by ID
   */
  getPortById(id: number): Observable<Port> {
    return this.http.get<Port>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new port
   */
  createPort(port: CreatePortRequest): Observable<Port> {
    return this.http.post<Port>(this.apiUrl, port)
      .pipe(
        tap(newPort => {
          // Add the new port to the local array
          this.allPorts.unshift(newPort);
          this.portsSubject.next([...this.allPorts]);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing port
   */
  updatePort(port: UpdatePortRequest): Observable<Port> {
    return this.http.put<Port>(`${this.apiUrl}/${port.id}`, port)
      .pipe(
        tap(updatedPort => {
          // Update the port in the local array
          const index = this.allPorts.findIndex(p => p.id === updatedPort.id);
          if (index !== -1) {
            this.allPorts[index] = updatedPort;
            this.portsSubject.next([...this.allPorts]);
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Delete a single port
   */
  deletePort(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          // Remove the port from the local array
          this.allPorts = this.allPorts.filter(p => p.id !== id);
          this.portsSubject.next([...this.allPorts]);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Delete multiple ports
   */
  deletePorts(ids: number[]): Observable<void> {
    // Create an array of delete requests
    const deleteRequests = ids.map(id => 
      this.http.delete<void>(`${this.apiUrl}/${id}`).toPromise()
    );

    return new Observable(observer => {
      Promise.all(deleteRequests)
        .then(() => {
          // Remove the ports from the local array
          this.allPorts = this.allPorts.filter(p => !ids.includes(p.id!));
          this.portsSubject.next([...this.allPorts]);
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(this.handleError(error));
        });
    });
  }

  /**
   * Bulk delete using request body (if your backend supports it)
   */
  bulkDeletePorts(ids: number[]): Observable<void> {
    return this.http.request<void>('delete', this.apiUrl, { 
      body: { ids } 
    }).pipe(
      tap(() => {
        // Remove the ports from the local array
        this.allPorts = this.allPorts.filter(p => !ids.includes(p.id!));
        this.portsSubject.next([...this.allPorts]);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Search ports by name
   */
  searchPortsByName(name: string): Observable<Port[]> {
    // If we have ports cached, search locally
    if (this.allPorts.length > 0) {
      const filtered = this.allPorts.filter(port =>
        port.name.toLowerCase().includes(name.toLowerCase())
      );
      return of(filtered);
    }

    // Otherwise, you could implement a backend search endpoint
    const params = new HttpParams().set('name', name);
    return this.http.get<Port[]>(`${this.apiUrl}/search`, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get ports by country
   */
  getPortsByCountry(countryId: number): Observable<Port[]> {
    // If we have ports cached, filter locally
    if (this.allPorts.length > 0) {
      const filtered = this.allPorts.filter(port => port.countryId === countryId);
      return of(filtered);
    }

    // Otherwise, call backend endpoint
    const params = new HttpParams().set('countryId', countryId.toString());
    return this.http.get<Port[]>(`${this.apiUrl}/by-country`, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get ports by city
   */
  getPortsByCity(cityId: number): Observable<Port[]> {
    // If we have ports cached, filter locally
    if (this.allPorts.length > 0) {
      const filtered = this.allPorts.filter(port => port.cityId === cityId);
      return of(filtered);
    }

    // Otherwise, call backend endpoint
    const params = new HttpParams().set('cityId', cityId.toString());
    return this.http.get<Port[]>(`${this.apiUrl}/by-city`, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Export ports data (if supported by backend)
   */
  exportPorts(format: 'excel' | 'csv' = 'excel'): Observable<Blob> {
    const params = new HttpParams().set('format', format);
    return this.http.get(`${this.apiUrl}/export`, {
      params,
      responseType: 'blob'
    }).pipe(catchError(this.handleError));
  }

  /**
   * Import ports from file (if supported by backend)
   */
  importPorts(file: File): Observable<{ success: number; failed: number; errors?: string[] }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ success: number; failed: number; errors?: string[] }>(
      `${this.apiUrl}/import`, 
      formData
    ).pipe(catchError(this.handleError));
  }

  /**
   * Check if port name exists
   */
  checkPortNameExists(name: string, excludeId?: number): Observable<boolean> {
    let params = new HttpParams().set('name', name);
    if (excludeId) {
      params = params.set('excludeId', excludeId.toString());
    }
    
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-name`, { params })
      .pipe(
        map(response => response.exists),
        catchError(this.handleError)
      );
  }

  /**
   * Get current ports from the subject
   */
  getCurrentPorts(): Port[] {
    return this.portsSubject.value;
  }

  /**
   * Clear the ports cache
   */
  clearCache(): void {
    this.allPorts = [];
    this.portsSubject.next([]);
  }

  /**
   * Refresh ports data
   */
  refreshPorts(): Observable<PaginatedResponse<Port>> {
    return this.getPorts();
  }

  /**
   * Helper method to get nested object values
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  /**
   * Handle HTTP errors
   */
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let apiError: ApiError;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      apiError = {
        message: `Client Error: ${error.error.message}`,
        status: 0,
        error: error.error
      };
    } else {
      // Server-side error
      apiError = {
        message: error.error?.message || `Server Error: ${error.status} ${error.statusText}`,
        status: error.status,
        error: error.error
      };
    }

    console.error('API Error:', apiError);
    return throwError(() => apiError);
  };
}