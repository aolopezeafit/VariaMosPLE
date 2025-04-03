
import { VariaMosGraph } from "../../UI/VariaMosGraph/VariaMosGraph"; 
import { Model } from "../../Domain/ProductLineEngineering/Entities/Model";

export default class VxgraphUtils {

    static deleteSelection(graph: VariaMosGraph, model: Model) {
        if (graph.isEnabled()) {
            let cells = graph.getSelectionCells();
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                if (cell.value) {
                    let uid = cell.value["uid"];
                    if (uid) {

                    }
                }
            }
            graph.removeCells(cells, true);
        }
    }

    //This does a recursive descent to find the vertice with the given uid
    static findVerticeById(graph, uid, parentVertice) {
        if (!parentVertice) {
            parentVertice = graph.getDefaultParent();
        }
        let items = graph.getChildVertices(parentVertice);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let vuid = item.value["uid"];
            if (vuid === uid) {
                return item;
            }
            let finded = this.findVerticeById(graph, uid, item)
            if (finded) {
                return finded;
            }
        }
        return null;
    }

    static findEdgeById(graph, uid, parentVertice) {
        if (!parentVertice) {
            parentVertice = graph.getDefaultParent();
        }
        let items = graph.getChildEdges(parentVertice);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let vuid = item.value["uid"];
            if (vuid === uid) {
                return item;
            }
            let finded = this.findEdgeById(graph, uid, item)
            if (finded) {
                return finded;
            }
        }
        return null;
    }
   

    static modifyShape(type:string, xmlShape:string) {
        // let foreground = ne.children[1];  //convertir el xml para extraer los text y mostrar el texto según las propiedades
        return;
        let foreground = null;
        for (let i = 0; i < foreground.children.length; i++) {
            const child = foreground.children[i];
            if (child.tagName == 'text') {
                if (child.attributes['dynamicproperties']) {
                    child.innerHTML = `<![CDATA[
                        function(shape)
                        {
                                try{
                                    if(!shape.state.cell){
                                        return;
                                    }
                                    if(!shape.state.cell.value){
                                        return;
                                    }
                                    if(!shape.state.cell.value.attributes){
                                        return;
                                    }
                                    
                                    let attributes=shape.state.cell.value.attributes; 
                                    var keys = Object.keys(attributes);
                                    console.log(keys); 
                                    keys = Object.getOwnPropertyNames(attributes);
                                    console.log(keys); 
                                    
                                    let strs=[];
                                    for (let i=0; i<keys.length; i++) {
                                        let key=keys[i]; 
                                        if (!attributes.hasOwnProperty(key)) continue; 
                                        if (!isNaN(key)) continue; 
                                        if (['uid', 'label', 'Name', 'Selected', 'type', 'title'].includes(key)) continue; 
                                        let name=key; 
                                        let value=attributes[key].value;
                                        strs.push(name + ": " + value); 
                                    }  
                                    return strs.join('\\r\\n');
                                }
                                catch(e){
                                    alert(JSON.stringify(e));
                                } 
                        }
                    ]]>`;
                } else if (child.attributes['propertyname']) {
                    let propertyNames: any = this.splitToArray(child.attributes['propertyname'].value);
                    let format: any = "{0}";
                    if (child.attributes['format']) {
                        format = child.attributes['format'].value;
                    }
                    let linkedproperty: any = null;
                    if (child.attributes['linkedproperty']) {
                        linkedproperty = child.attributes['linkedproperty'].value;
                    }
                    let linkedvalue: any = null;
                    if (child.attributes['linkedvalue']) {
                        linkedvalue = child.attributes['linkedvalue'].value;
                    }
                    if (propertyNames.length == 1) {
                        child.innerHTML = `<![CDATA[ 
                            function(shape)
                            { 
                                    try{
                                        if(!shape){
                                            return;
                                        }
                                        if(!shape.state){
                                            return;
                                        }
                                        if(!shape.state.cell){
                                            return;
                                        }
                                        if(!shape.state.cell.value){
                                            return;
                                        }
                                        if(!shape.state.cell.value.attributes){
                                            return;
                                        }
                                        console.log(JSON.stringify(shape.state.cell.value.attributes));
                                        if(shape.state.cell.value.attributes['` + propertyNames[0] + `']){
                                            return shape.state.cell.value.attributes['` + propertyNames[0] + `'].value;
                                        }
                                    }
                                    catch(e){
                                        alert(JSON.stringify(e));
                                    } 
                            }
                            ]]>`;
                    } else if (propertyNames.length > 1) {
                        let label = `'` + format + `'`;
                        for (let i = 0; i < propertyNames.length; i++) {
                            label = this.replaceAll(label, '{' + i + '}', `' + shape.state.cell.value.attributes['` + propertyNames[i] + `'].value + '`);
                        }
                        let script = [];
                        script.push('');
                        if (linkedproperty) {
                            script.push(`if (shape.state.cell.value.attributes['` + linkedproperty + `'].value == '` + linkedvalue + `'){`);
                            script.push(`  return ` + label);
                            script.push('}');
                        } else {
                            script.push(`  return ` + label);
                        }
                        let str = script.join("\n");
                        child.innerHTML = `<![CDATA[ 
                            function(shape)
                            {
                                try{
                                    ` + str + `;
                                }
                                catch(e){
                                    alert(JSON.stringify(e));
                                } 
                            }
                            ]]>`;
                    }
                } else {
                    // child.innerHTML = ``;
                }
            }
        }
        return;
    }

    static splitToArray(value: String) {
        let array = value.split(",");
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i].trim();
        }
        return array;
    }

    static replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }


    static GetSelectedElementsIds(graph: VariaMosGraph, model: Model) {
        let ids = [];
        if (graph.isEnabled()) {
            let cells = graph.getSelectionCells(); 
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                if (cell.value) {
                    let uid = cell.value["uid"];
                    if (uid) {
                        ids.push(uid);
                    }
                }
            }
        }
        return ids;
    }

    static GetSelectedRelationshipsIds(graph: VariaMosGraph, model: Model) {
        let ids = [];
        if (graph.isEnabled()) {
            let cells = graph.getSelectionCells();
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                if (cell.value) {
                    let uid = cell.value["uid"];
                    if (uid) {
                        ids.push(uid);
                    }
                }
            }
        }
        return ids;
    }

}