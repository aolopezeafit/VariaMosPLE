import GeometryPoint from "./geometryPoint"; 

export default class Geometry{ 
    private _x: number;
     public get x(): number {
         return this._x;
     }
     public set x(value: number) {
         this._x = value;
     }
 
     private _y: number;
     public get y(): number {
         return this._y;
     }
     public set y(value: number) {
         this._y = value;
     }

    private _width: number;
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }

    private _height: number;
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }

    private _offset: GeometryPoint;
    public get offset(): GeometryPoint {
        return this._offset;
    }
    public set offset(value: GeometryPoint) {
        this._offset = value;
    }

    private _points: GeometryPoint[];
    public get points(): GeometryPoint[] {
        return this._points;
    }
    public set points(value: GeometryPoint[]) {
        this._points = value;
    }
 


    constructor(x, y, width, height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }


}