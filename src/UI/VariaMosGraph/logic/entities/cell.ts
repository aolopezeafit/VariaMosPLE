import Geometry from "./geometry";

export default class Cell {
    private _id: String; //esto va a reemplazar a value.getAttribute("uid")
    public get id(): String {
        return this._id;
    }
    public set id(value: String) {
        this._id = value;
    }

    private _value: any=[];
    public get value(): any {
        return this._value;
    }
    public set value(value: any) {
        this._value = value;
    }

    private _edge: Boolean; //define si la celda es un edge(flecha) o un vertex(caja)
    public get edge(): Boolean {
        return this._edge;
    }
    public set edge(value: Boolean) {
        this._edge = value;
    }

    private _geometry: Geometry;
    public get geometry(): Geometry {
        return this._geometry;
    }
    public set geometry(value: Geometry) {
        this._geometry = value;
    }

    private _node: any;
    public get node(): any {
        return this._node;
    }
    public set node(value: any) {
        this._node = value;
    }

    private _style: string;
    public get style(): string {
        return this._style;
    }
    public set style(value: string) {
        this._style = value;
    }

    private attributes=[]; 

    constructor(value?: any, geometry?: Geometry, style?: string) {
        this.value = value?value:[];
        this.geometry = geometry;
        this.style = style;
    }

    setConnectable(active) {
        //establece si se pueden tirar flechas a o deste esta celda
    }

    setVertex(isVertex) {
        this.edge=!isVertex;
    }

    setAttribute(name, value){
        this.attributes[name]=value;
    }
}