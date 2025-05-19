export class NgxDatable {
  id: number;
  Name: string;
  packageType: string;
  measurement: string;
  constructor(departmentList: NgxDatable) {
    {
      this.id = departmentList.id || this.getRandomID();
      this.Name = departmentList.Name || '';
      this.packageType = departmentList.packageType || '';
      this.measurement = departmentList.measurement || '';

    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
