import React, { Component } from "react";
import ProjectService from "../../Application/Project/ProjectService";
import MxGEditor from "../MxGEditor/MxGEditor";
import VxGEditor from "../MxGEditor/MxGEditor";

interface Props {
  projectService: ProjectService;
}
interface State {}

class DiagramEditor extends Component<Props, State> {
  state = {};

  // constructor(props:Props){
  //   super(props);
  // }

  render() {
    return (
      <div id="EditorPannel" className="h-100">
            {/* <MxGEditor projectService={this.props.projectService} /> */}
            <VxGEditor projectService={this.props.projectService} />
      </div>
    );
  }
}

export default DiagramEditor;
