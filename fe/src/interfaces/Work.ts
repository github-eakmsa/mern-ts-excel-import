
export interface IWork {
    id?: number | null,
    item_no: number,
    desc: string,
    unit: string,
    qty: number,
    rate: number,
    amt: number,
    createdAt: Date | null,
    updatedAt: Date | null
}

export class Work implements IWork {
    public id: null;
    public item_no: number;
    public desc: string;
    public unit: string;
    public qty: number;
    public rate: number;
    public amt: number;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;

    constructor() {
        this.id = null;
        this.item_no = 0;
        this.desc = "";
        this.unit = "";
        this.qty = 0;
        this.rate = 0;
        this.amt = 0;
        this.createdAt = null;
        this.updatedAt = null;
    }
}
