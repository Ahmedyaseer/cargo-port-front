import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [    MatButtonModule,MatFormField,MatIconModule,MatSelectModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  // encapsulation: ViewEncapsulation.None 
})
export class PaginatorComponent {
  @Input() totalElements = 0;
  @Input() pageSize = 5;  // ✅ Default is 5 rows per page
  @Input() pageIndex = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Output() pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }

  changePageSize(event: any) {
    const newSize = Number(event.value); // Extract the value correctly
    if (!isNaN(newSize)) {
      const firstItemIndex = this.pageIndex * this.pageSize;
      this.pageSize = newSize;
      this.pageIndex = Math.floor(firstItemIndex / this.pageSize);
      this.emitPageChange();
    }
  }
  
  

  onPageClick(newIndex: number) {
    if (newIndex >= 0 && newIndex < this.totalPages) {
      this.pageIndex = newIndex;
      this.emitPageChange();
    }
  }

  private emitPageChange() {
    this.pageChange.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize });
  }

  visiblePages(): number[] {
    const maxPages = 3;
    let startPage = Math.max(1, this.pageIndex + 1 - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);

    // Adjust start if endPage reaches the limit
    startPage = Math.max(1, endPage - maxPages + 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}


}
