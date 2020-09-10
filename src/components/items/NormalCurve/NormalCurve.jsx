import React, { Component } from 'react';
import './NormalCurve.css';
import axios from 'axios';
import { json } from 'd3';

class NormalCurve extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
    this.rectRef = React.createRef();
    this.svgRef = React.createRef();
    this.areaRef = React.createRef();
    this.lengthRef = React.createRef();
    this.startPos1Ref = React.createRef();
    this.startPos2Ref = React.createRef();
    this.graph1keyRef = React.createRef();
    this.graph2keyRef = React.createRef();
    this.qRef = React.createRef();
    this.colNumValRef = React.createRef();
    this.radiusRef = React.createRef();
    this.ticksRef = React.createRef();
    this.checkBoxRef = React.createRef();
    this.toggleTriRef1 = React.createRef();
    this.toggleTriRef2 = React.createRef();
    this.questionKeyRef = React.createRef();
    this.legendKey1Ref = React.createRef();
    this.legendKey2Ref = React.createRef();
    this.color1Ref = React.createRef();
    this.color2Ref = React.createRef();

    this.arg0ref = React.createRef();
    this.arg1ref = React.createRef();
    this.arg2ref = React.createRef();
    this.arg3ref = React.createRef();
    this.arg4ref = React.createRef();
    this.arg5ref = React.createRef();
    this.arg6ref = React.createRef();

    this.dotReturn = this.dotReturn.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.triMouseDown = this.triMouseDown.bind(this);
    this.triDrag = this.triDrag.bind(this);
    this.triUp = this.triUp.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.lengthSubmit = this.lengthSubmit.bind(this);
    this.toggleXVals = this.toggleXVals.bind(this);
    this.alterStartPos1 = this.alterStartPos1.bind(this);
    this.alterStartPos2 = this.alterStartPos2.bind(this);
    this.onChange = this.onChange.bind(this);
    this.svgColReturn = this.svgColReturn.bind(this);
    this.svgColReturn = this.svgColReturn.bind(this);
    this.establishStateData = this.establishStateData.bind(this);
    this.updateRadius = this.updateRadius.bind(this);
    this.updateTicks = this.updateTicks.bind(this);
    this.checkChange = this.checkChange.bind(this);
    this.toggleTri1 = this.toggleTri1.bind(this);
    this.toggleTri2 = this.toggleTri2.bind(this);
    this.returnTri1 = this.returnTri1.bind(this);
    this.returnTri2 = this.returnTri2.bind(this);
    this.changeColor1 = this.changeColor1.bind(this);
    this.changeColor2 = this.changeColor2.bind(this);
    this.changeJSON = this.changeJSON.bind(this);
    this.onUpdateShapes = this.onUpdateShapes.bind(this);
    this.onFinishShapes = this.onFinishShapes.bind(this);

    this.state = this.establishStateData(this.props.data);
  }

  componentDidMount() {
    this.curveArea();
  }

  establishStateData(data) {
    // console.log("establishStateData()", new Date());
    const unitHeight = data["max-height"];
    const circRad = data["circle-radius"];
    const len1 = data["len1"];
    const len2 = data["len2"];
    const distancing = circRad * 4 - 1;
    const height = (Math.ceil((distancing * unitHeight) / 50) + 1) * 50;

    const colNumInit = data["axis-length"];
    const internalLength = colNumInit * distancing;
    const edgeCol = Math.ceil(Math.max(len1, len2) / 2);
    const edgeLength = Math.max(len1, len2) * distancing;

    const ceilDist = height - 50;
    const length = edgeLength + internalLength;
    const colNum = Math.ceil(length / distancing);

    const axisStart = Math.ceil(edgeLength / 2);
    const axisStartCol = edgeCol;
    const axisWidth = length - ((len1 / 2 + 1) * distancing + (len2 / 2 + 1) * distancing - 1);
    const axisEndCol = internalLength / distancing;
    const axisEnd = axisEndCol * distancing;

    const triCent1 = Math.ceil(0.5 * len1) * distancing;
    const triCent2 = Math.ceil(0.5 * len2) * distancing;
    const triCentCol1 = Math.ceil(triCent1 / distancing);
    const triCentCol2 = Math.ceil(triCent2 / distancing);

    const variance1 = Math.abs(Math.ceil(len1 / 2) - axisStartCol);
    const variance2 = Math.abs(Math.ceil(len2 / 2) - axisStartCol);

    let edgeLim;
    if ("edgeLim" in data) {
      edgeLim = data["edgeLim"];
    }
    else {
      edgeLim = true;
    }

    const startPos1 = data["startPos1"];
    let distancing1 = startPos1 + variance1 - 1;
    let col11 = startPos1 + variance1;
    let col12 = startPos1 + len1 - 1;
    let col11Rel = startPos1;

    let variance = axisStartCol - variance1;
    if (edgeLim) {
      if (col11 < axisStartCol - 1) {
        distancing1 = (axisStartCol - 1) * distancing;
        col11 = 0;
        col12 = len1 - 1;
      }
      else if (col11 + len1 + 1 > axisStartCol + axisEndCol) {
        const endCol = axisEndCol - len1;
        distancing1 = distancing * (axisStartCol + endCol - 1);
        col11 = endCol;
        col12 = endCol + len2 - 1;
      }
      else {
        distancing1 = distancing * col11;
        col11 = col11Rel - variance;
        col12 = col11Rel - variance + len1 - 1;
      }
    }
    else {
      // col11 = col11 - 1;
      if (col11 + triCentCol1 < axisStartCol) {
        distancing1 = (variance1) * distancing;
        col11 = 0;
        col12 = len1 - 1;
      }
      else if (col11 + triCentCol1 > axisStartCol + axisEndCol) {
        distancing1 = distancing * (variance1 + axisEndCol);
        col11 = axisEndCol;
        col12 = axisEndCol + len1 - 1;
      }
      else {
        distancing1 = distancing * (col11);
        col11 = col11Rel;
        col12 = col11Rel + len1 - 1;
      }
    }

    const startPos2 = data["startPos2"];
    let distancing2 = startPos2 + variance2 - 1;
    let col21 = startPos2 + variance2;
    let col22 = startPos2 + len2 - 1;
    let col21Rel = startPos2;

    variance = axisStartCol - variance2;
    if (edgeLim) {
      if (col21 < axisStartCol - 1) {
        distancing2 = (axisStartCol - 1) * distancing;
        col21 = 0;
        col22 = len2 - 1;
      }
      else if (col21 + len2 + 1 > axisStartCol + axisEndCol) {
        const endCol = axisEndCol - len2;
        distancing2 = distancing * (axisStartCol + endCol);
        col21 = endCol;
        col22 = endCol + len2 - 1;
      }
      else {
        distancing2 = distancing * col21;
        col21 = col21Rel - variance;
        col22 = col21Rel - variance + len2 - 1;
      }
    }
    else {
      // col21 = col21 - 1;
      if (col21 + triCentCol2 < axisStartCol) {
        distancing2 = (variance2) * distancing;
        col21 = 0;
        col22 = len2 - 1;
      }
      else if (col21 + triCentCol2 > axisStartCol + axisEndCol) {
        distancing2 = distancing * (variance2 + axisEndCol - 1);
        col21 = axisEndCol;
        col22 = axisEndCol + len2 - 1;
      }
      else {
        distancing2 = distancing * (col21);
        col21 = col21Rel;
        col22 = col21Rel + len2 - 1;
      }
    }

    let colNumVal;
    if ("colNumVal" in data) {
      colNumVal = this.props.data["colNumVal"];
    }
    else {
      colNumVal = 1;
    }

    let tickNum;
    let tickDist;
    let rangeVal;
    const axisLength = colNumInit * colNumVal;
    if ("tickNum" in data && axisLength % (parseInt(data["tickNum"]) + 1) === 0) {
      tickNum = parseInt(data["tickNum"]);
      tickDist = colNumInit * distancing / (tickNum + 1);
      rangeVal = axisLength / (tickNum + 1);
    }
    else {
      tickNum = 0;
      tickDist = axisLength;
      rangeVal = axisLength;
    }

    let fixCurve1;
    if ("fixCurve1" in data) {
      fixCurve1 = data["fixCurve1"];
    }
    else {
      fixCurve1 = false;
    }

    let fixCurve2;
    if ("fixCurve2" in data) {
      fixCurve2 = data["fixCurve2"];
    }
    else {
      fixCurve2 = false;
    }

    let maxLength = len1;
    if (len2 > len1) {
      maxLength = len2;
    }

    let color1;
    if ("color1" in data) {
      color1 = data["color1"];
    }
    else {
      color1 = "CornflowerBlue";
    }

    let color2;
    if ("color2" in data) {
      color2 = data["color2"];
    }
    else {
      color2 = "Crimson";
    }

    return {
      jsonData: data,
      axisLength: data["axis-length"],
      startPos1: data["startPos1"],
      startPos2: data["startPos2"],
      x: 0, y: 0, isDown: false,
      rectX: 12.5,
      down: false,
      svgWidth: length,
      svgHeight: height,
      svgX: 6,
      len1: len1,
      colValHeiS: data["colValHeiS"],
      len2: len2,
      colValHeiS2: data["colValHeiS2"],
      distancing: distancing,
      distancing1 : distancing1,
      distancing2: distancing2,
      triCent1: triCentCol1 * distancing,
      triCentCol1: triCentCol1,
      triCent2: triCentCol2 * distancing,
      triCentCol2: triCentCol2,
      mousePointerRange: 0,
      triDown: false,
      col11: col11,
      col12: col12,
      col21: col21,
      col22: col22,
      colLim1: Math.round((length - (len1 * distancing)) / distancing),
      colLim2: Math.round((length - (len2 * distancing)) / distancing),
      overlapVals: data["overlapVals"],
      circRad: circRad,
      ceilDist: ceilDist,
      axisStart: axisStart,
      axisStartCol: axisStartCol,
      axisWidth: axisWidth,
      axisEnd: axisEnd,
      axisEndCol: axisEndCol,
      edgeCol: edgeCol,
      edgeLength: edgeLength,
      colNum: colNumInit,
      variance1: variance1,
      variance2: variance2,
      lowVal: this.props.data["lowVal"],
      showCoors: true,
      colNumVal: colNumVal,
      tickNum: tickNum,
      tickDist: tickDist,
      rangeVal: rangeVal,
      edgeLim: edgeLim,
      fixCurve1: fixCurve1,
      fixCurve2: fixCurve2,
      maxLength: maxLength,
      color1: color1,
      color2: color2
    };
  }

  dotReturn(xPos, yPos) {
    const xPosOrig = xPos;

    const CX = this.state.distancing1 + this.state.distancing * (xPosOrig + 1) + this.state.circRad - this.state.maxLength + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    var hard = 
    <circle 
    // onMouseEnter={e => this.displayTag1(e)}
    // onMouseLeave={e => this.hideTag1(e)}
    // onMouseMove={e => this.updateTag1(e)} 
    className="icon" 
    stroke={this.state.color1} 
    fill={this.state.color1}
    fillOpacity="0.3" 
    strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}>
    </circle>;

    return hard;
  }

  dotReturn2(xPos, yPos) {
    const xPosOrig = xPos;

    const CX = this.state.distancing2 + this.state.distancing * (xPosOrig + 1) + this.state.circRad - this.state.maxLength + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    var hard = 
    <circle 
    // onMouseEnter={e => this.displayTag2(e)}
    // onMouseLeave={e => this.hideTag2(e)}
    // onMouseMove={e => this.updateTag2(e)} 
    className="icon" 
    stroke={this.state.color2}
    fill={this.state.color2}
    fillOpacity="0.3" 
    strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}>

    </circle>;

    return hard;
  }

  returnTri1() {
    if (this.state.fixCurve1) {
      return (null);
    }
    else {
      return (
        <polygon
            points={
              [
                [this.state.triCent1 + this.state.distancing1 - 15, this.state.ceilDist + 35],
                [this.state.triCent1 + this.state.distancing1 + 15, this.state.ceilDist + 35],
                [this.state.triCent1 + this.state.distancing1, this.state.ceilDist + 20]
              ]
            }
            onMouseDown={(e, num) => this.triMouseDown(e, 1)}
          />
      )
    }
  }

  returnTri2() {
    if (this.state.fixCurve2) {
      return (null);
    }
    else {
      return (
        <polygon
            points={
              [
                [this.state.triCent2 + this.state.distancing2 - 15, this.state.ceilDist + 35],
                [this.state.triCent2 + this.state.distancing2 + 15, this.state.ceilDist + 35],
                [this.state.triCent2 + this.state.distancing2, this.state.ceilDist + 20]
              ]
            }
            onMouseDown={(e, num) => this.triMouseDown(e, 2)}
          />
      )
    }
  }

  svgColReturn(e, dragger) {
    let distFromCent;
    let variance;
    if (dragger === 1) {
      distFromCent = this.state.triCentCol1;
      variance = this.state.variance1;
    }
    else if (dragger === 2) {
      distFromCent = this.state.triCentCol2;
      variance = this.state.variance2;
    }
    var svg = this.svgRef.current;
    var pt = svg.createSVGPoint();
    pt.x = e.clientX;
    var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    e.preventDefault();
    var x = svgP.x - distFromCent + this.state.mousePointerRange;
    var col = Math.round((x - this.state.axisStart) / this.state.distancing) + variance;
    var colRelative = Math.round((x - this.state.axisStart) / this.state.distancing) + 1;
    // console.log(col, colRelative, variance);
    return [col, colRelative];
  }

  svgColPlacement(col, colRelative, dragger) {
    // console.log(col);
    // console.log(this.state.axisStartCol);
    // console.log(this.state.axisStart);
    if (this.state.edgeLim) {
      if (dragger === 2) {
        const variance = this.state.axisStartCol - this.state.variance2;
        if (col < this.state.axisStartCol - 1) {
          // console.log("edge");
          this.setState({ distancing2: (this.state.axisStartCol - 1) * this.state.distancing, col21: 0, col22: this.state.len2 - 1 });
        }
        else if (col + this.state.len2 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          const endCol = this.state.axisEndCol - this.state.len2;
          this.setState({ distancing2: this.state.distancing * (this.state.axisStartCol + endCol - 1), col21: endCol, col22: endCol + this.state.len2 - 1 })
        }
        else {
          this.setState({ distancing2: this.state.distancing * col, col21: colRelative - variance, col22: colRelative - variance + this.state.len2 - 1 });
        }
        this.curveArea();
      }
      else if (dragger === 1) {
        const variance = this.state.axisStartCol - this.state.variance1;
        if (col < this.state.axisStartCol - 1) {
          this.setState({ distancing1: (this.state.axisStartCol - 1) * this.state.distancing, col11: 0, col12: this.state.len1 - 1 });
        }
        else if (col + this.state.len1 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          const endCol = this.state.axisEndCol - this.state.len1;
          this.setState({ distancing1: this.state.distancing * (this.state.axisStartCol + endCol - 1), col11: endCol, col12: endCol + this.state.len1 - 1 })
        }
        else {
          this.setState({ distancing1: this.state.distancing * col, col11: colRelative - variance, col12: colRelative - variance + this.state.len1 - 1 });
        }
        // this.setState({ distancing2 : x })
      }
    }
    else {
      col = col - 1;
      if (dragger === 2) {
        // colRelative = colRelative - this.state.axisStartCol + this.state.variance2;
        if (col + this.state.triCentCol2 < this.state.axisStartCol) {
          this.setState({ distancing2: (this.state.variance2) * this.state.distancing, col21: 0, col22: this.state.len2 - 1 });
        }
        else if (col + this.state.triCentCol2 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          this.setState({ distancing2: this.state.distancing * (this.state.variance2 + this.state.axisEndCol - 1), col21: this.state.axisEndCol, col22: this.state.axisEndCol + this.state.len2 - 1 })
        }
        else {
          this.setState({ distancing2: this.state.distancing * col, col21: colRelative, col22: colRelative + this.state.len2 - 1 });
        }
        this.curveArea();
      }
      else if (dragger === 1) {
        // colRelative = colRelative - this.state.axisStartCol + this.state.variance1;
        if (col + this.state.triCentCol1 < this.state.axisStartCol) {
          this.setState({ distancing1: (this.state.variance1) * this.state.distancing, col11: 0, col12: this.state.len1 - 1 });
        }
        else if (col + this.state.triCentCol1 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          this.setState({ distancing1: this.state.distancing * (this.state.variance1 + this.state.axisEndCol - 1), col11: this.state.axisEndCol, col12: this.state.axisEndCol + this.state.len1 - 1 })
        }
        else {
          this.setState({ distancing1: this.state.distancing * col, col11: colRelative, col12: colRelative + this.state.len1 - 1 });
        }
        this.curveArea();
      }
    }
  }

  triMouseDown(e, num) {
    if (e.type === "mousedown") {
      // console.log("MOUSEDOWN");
      e.preventDefault();
      var svgPre = this.svgRef.current;
      // Set mousePointerRange so that we know the distance
      // from the mouse tip to the x-value of the triangle
      // tip
      var ptPre = svgPre.createSVGPoint();
      ptPre.x = e.clientX;
      var svgPPre = ptPre.matrixTransform(svgPre.getScreenCTM().inverse());
      if (num === 1) {
        this.setState(prevState => ({
          // rectX : svgP.x,
          triDown: num,
          mousePointerRange: prevState.triCent1 + this.state.distancing1 - svgPPre.x
        }));
      }
      else if (num === 2) {
        this.setState(prevState => ({
          // rectX : svgP.x,
          triDown: num,
          mousePointerRange: prevState.triCent2 + this.state.distancing2 - svgPPre.x
        }));
      }
      // console.log(this.state);
    }
  }

  triDrag(e) {
      e.preventDefault();
      var dragger = this.state.triDown;
      var cols = this.svgColReturn(e, dragger);
      var col = cols[0];
      var colRelative = cols[1]
      // console.log(col);
      this.setState(this.svgColPlacement(col, colRelative, dragger));
      this.curveArea();
  }

  triUp(e) {
    // console.log("UP");
    if (this.state.triDown) {
      this.setState({ triDown: false });
    }
  }

  curveArea() {
    let col11;
    let col12;
    let col21;
    let col22;

    if (this.state.edgeLim) {
      col11 = this.state.col11;
      col12 = this.state.col12;
      col21 = this.state.col21;
      col22 = this.state.col22;
    }
    else {
      col11 = this.state.col11 + this.state.variance1;
      col12 = this.state.col12 + this.state.variance1;
      col21 = this.state.col21 + this.state.variance2;
      col22 = this.state.col22 + this.state.variance2;
    }

    if (col11 > col22 || col12 < col21) {
      this.areaRef.current.innerHTML = 0;
    }
    else {
      // console.log(this.state.col22, this.state.col11, Math.abs(this.state.col22 - this.state.col11));
      this.areaRef.current.innerHTML = this.state.overlapVals[Math.abs(col22 - col11)];
    }
  }

  delete() {
    this.props.delete(this.props.count);
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  changeJSON(key, value, data) {
    this.props.changeJSON(key, value, data);
  }

  handleChange(key, value, count) {
    this.props.handleChange(key, value, count);
  }

  componentDidMount() {
    // importing component, save imported data
    if (this.props.imported) {
      this.handleChange("Question", this.props.qToDisplay["Question"], this.props.count);
      this.handleChange("graph1key", this.props.qToDisplay["graph1key"], this.props.count);
      this.handleChange("graph2key", this.props.qToDisplay["graph2key"], this.props.count);
      this.setState({ configuredShapes: true });
    } else {
      this.setState({ configuredShapes: false });
    }
    if (this.props.editing) {
      this.handleChange("normal-curve-question-key", this.props.qToDisplay["normal-curve-question-key"], this.props.count);
      this.handleChange("normal-curve-legend-key1", this.props.qToDisplay["normal-curve-legend-key1"], this.props.count);
      this.handleChange("normal-curve-legend-key2", this.props.qToDisplay["normal-curve-legend-key2"], this.props.count);
    };
  }

  lengthSubmit() {
    const newLength = this.lengthRef.current.value;
    const internalLength = newLength * this.state.distancing;
    const length = this.state.edgeLength + internalLength;

    const axisEndCol = internalLength / this.state.distancing;
    const axisEnd = axisEndCol * this.state.distancing;
    // console.log(axisEndCol);

    this.changeJSON("axis-length", Number(newLength), this.state.jsonData);

    this.setState({
      colNum: newLength,
      svgWidth: length,
      axisEndCol: axisEndCol,
      axisEnd: axisEnd
    });

    const col1 = this.state.col11 - 1 + this.state.variance1;
    this.svgColPlacement(col1, this.state.col11, 1);

    const col2 = this.state.col21 - 1 + this.state.variance2;
    this.svgColPlacement(col2, this.state.col21, 2);
  }

  toggleXVals() {
    this.setState(prevState => {
      return {
        showCoors: !prevState.showCoors
      }
    })
  }

  alterStartPos1(newPos) {
    let startPos1 = parseInt(this.startPos1Ref.current.value) + this.state.variance1;
    let col11 = startPos1 - this.state.variance1 + 1;
    let col12 = col11 + this.state.len1 - 1;
    if (startPos1 + this.state.triCentCol1 < this.state.axisStartCol) {
      startPos1 = this.state.variance1 - 1;
      col11 = 0;
      col12 = this.state.len1 - 1;
    }
    else if (startPos1 + this.state.triCentCol1 > this.state.axisStartCol + this.state.axisEndCol) {
      startPos1 = this.state.variance1 + this.state.axisEndCol - 1;
      col11 = this.state.axisEndCol;
      col12 = this.state.axisEndCol + this.state.len1 - 1;
    }

    this.changeJSON("startPos1", Number(newPos), this.state.jsonData);

    this.setState({
      distancing1: startPos1 * this.state.distancing,
      col11: col11,
      col12: col12
    });
  }

  alterStartPos2(newPos) {
    let startPos2 = parseInt(this.startPos2Ref.current.value) + this.state.variance2;
    let col21 = startPos2 - this.state.variance2 + 1;
    let col22 = col21 + this.state.len2 - 1;
    if (startPos2 + this.state.triCentCol2 < this.state.axisStartCol) {
      startPos2 = this.state.variance2 - 1;
      col21 = 0;
      col22 = this.state.len2 - 1;
    }
    else if (startPos2 + this.state.triCentCol2 > this.state.axisStartCol + this.state.axisEndCol) {
      startPos2 = this.state.variance2 + this.state.axisEndCol - 1;
      col21 = this.state.axisEndCol;
      col22 = this.state.axisEndCol + this.state.len2 - 1;
    }

    this.changeJSON("startPos2", Number(newPos), this.state.jsonData);

    this.setState({
      distancing2: startPos2 * this.state.distancing,
      col21: col21,
      col22: col22
    });
  }
  
  updateRadius(radius) {
    // console.log("updateRadius", radius);
    this.changeJSON("circle-radius", parseInt(radius), this.state.jsonData);
    let newData = this.state.jsonData;
    newData["circle-radius"] = parseInt(radius);
    this.setState(this.establishStateData(newData));
  }

  updateTicks(newTickCount) {
    this.changeJSON("tickNum", parseInt(newTickCount), this.state.jsonData);
    let newData = this.state.jsonData;
    newData["tickNum"] = parseInt(newTickCount);
    this.setState(this.establishStateData(newData));
  }

  updateColVal(colVal) {
    this.changeJSON("colNumVal", parseInt(colVal), this.state.jsonData);
    let newData = this.state.jsonData;
    newData["colNumVal"] = parseInt(colVal);
    this.setState(this.establishStateData(newData));
    // this.changeJSON("colNumVal", colVal);
    // this.setState({ colNum: colVal });
  }

  checkChange() {
    this.setState(prevState => {
      this.changeJSON("edgeLim", !Boolean(prevState.edgeLim), this.state.jsonData);
      return {
        edgeLim: Number(!Boolean(prevState.edgeLim))
      }
    })
    // console.log(this.state.edgeLim);
  }

  toggleTri1() {
    if (!this.state.fixCurve1) {
      this.setState({startPos1 : this.state.distancing1})
    }
    this.setState(prevState => {
      this.changeJSON("fixCurve1", !prevState.fixCurve1, this.state.jsonData);
      return {
        fixCurve1 : !prevState.fixCurve1
      }});
  }

  toggleTri2() {
    if (!this.state.fixCurve2) {
      this.setState({startPos2 : this.state.distancing2})
    }
    this.setState(prevState => {
      this.changeJSON("fixCurve2", !prevState.fixCurve2, this.state.jsonData);
      return {
        fixCurve2 : !prevState.fixCurve2
      }});
  }

  changeColor1() {
    const newColor = this.color1Ref.current.value;
    this.changeJSON("color1", newColor, this.state.jsonData);
    this.setState({ color1 : newColor });
  }

  changeColor2() {
    const newColor = this.color2Ref.current.value;
    this.changeJSON("color2", newColor, this.state.jsonData);
    this.setState({ color2 : newColor });
  }

  onUpdateShapes() {
    const argArr = [
      Number(this.arg0ref.current.value),
      Number(this.arg1ref.current.value),
      Number(this.arg2ref.current.value),
      Number(this.arg3ref.current.value),
      Number(this.arg4ref.current.value),
      Number(this.arg5ref.current.value),
      Number(this.arg6ref.current.value),
    ];
    // console.log(argArr);
    axios
      .post('https://test-api-615.herokuapp.com/normalCurve', 
        { argArr: argArr })
      .then(res => {
        const jsonData = JSON.parse(res.data.replace(/'/g, '"'));
        this.handleChange('FileContent', jsonData, this.props.count);
        this.setState(this.establishStateData(jsonData));
      })
  }

  onFinishShapes() {
    var confirm = window.confirm("Are you sure these are the shapes you want?"+
      " Once you click 'OK', you won't be able to change the shapes again" + 
      " for this question.");
    if (confirm) {
      this.onUpdateShapes();
      this.setState({ configuredShapes: true });
    } else {
      alert("Continue to configure shapes ... ");
    }
  }

  render() {
    const qNum = this.props.count + 1;

    const defaultVal = (qType) => {
      if (this.props.qToDisplay) {
        return this.props.qToDisplay[qType]
      } else {
        return ""
      }}
    
    const defaultCurveVal = (dataType) => {
      if (this.props.qToDisplay) {
        return this.props.qToDisplay["FileContent"][dataType]
      } else {
        return ""
      }
    }

    const defaultArg = (whichArg) => {
      if (this.props.configArgs) {
        return this.props.configArgs[whichArg];
      } else {
        return 0;
      }
    }

    return (
      <div>
        <div className="boxed">
          {
            this.state.configuredShapes
            ?
            <h4>You have already configured normal curve shapes for this question.</h4>
            :
            <div>
              <h4>Configure Shapes</h4>
              <div className="args-container">
                <div className="arg">
                  First Curve Height
                  <br/>
                  <input type="text" ref={this.arg0ref} 
                    defaultValue={defaultArg(0)}/>
                </div>
                <div className="arg">
                  First Curve Width
                  <br/>
                  <input type="text" ref={this.arg1ref}
                    defaultValue={defaultArg(1)}/>
                </div>
                <div className="arg">
                  Second Curve Height
                  <br/>
                  <input type="text" ref={this.arg2ref}
                    defaultValue={defaultArg(2)}/>
                </div>
                <div className="arg">
                  Second Curve Width
                  <br/>
                  <input type="text" ref={this.arg3ref}
                    defaultValue={defaultArg(3)}/>
                </div>
              </div>
              <div className="args-container">
                <div className="arg">
                  Circle Radius <br/> (2 ~ 5 inclusive)
                  <br/>
                  <input type="text" ref={this.arg4ref}
                    defaultValue={defaultArg(4)}/>
                </div>
                <div className="arg">
                  x-axis length <br/> (at least 1)
                  <br/>
                  <input type="text" ref={this.arg5ref}
                    defaultValue={defaultArg(5)}/>
                </div>
                <div className="arg">
                  x-axis lowest value <br/> (at least 0)
                  <br/>
                  <input type="text" ref={this.arg6ref}
                    defaultValue={defaultArg(6)}/>
                </div>
              </div>
              <br/>
              <button onClick={() => this.onUpdateShapes()}>
                Update 
              </button> <br/>
              <button onClick={() => this.onFinishShapes()}>
                Proceed to Configure Experiment
              </button>
            </div>
          }
          
          <div 
            onMouseMove={e => this.triDrag(e)}
            onMouseUp={e => this.triUp(e)}>
            <svg width={this.state.svgWidth} height={this.state.svgHeight + 10} ref={this.svgRef}>
              {/* <rect opacity="0.2" width="100%" height="100%" fill="red"/> */}
              {[...Array(this.state.len1).keys()].map(
                (col) =>
                  [...Array(this.state.colValHeiS[col]).keys()].map(
                    (row) => this.dotReturn(col, row)
                  )
              )}
              {[...Array(this.state.len2).keys()].map(
                (col) =>
                  [...Array(this.state.colValHeiS2[col]).keys()].map(
                    (row) => this.dotReturn2(col, row)
                  )
              )}
              <rect width={this.state.axisEnd - this.state.distancing}
                height="2"
                fill="black"
                x={this.state.axisStartCol * this.state.distancing - 1}
                y={this.state.ceilDist + 20} />
              <rect width="2"
                height="20"
                fill="black"
                x={this.state.axisStartCol * this.state.distancing - 1}
                y={this.state.ceilDist + 20} />
              <rect width="2"
                height="20"
                fill="black"
                x={this.state.axisEnd - this.state.distancing + this.state.axisStartCol * this.state.distancing - 1}
                y={this.state.ceilDist + 20} />
              {[...Array(this.state.tickNum).keys()].map(
                (tick) =>
                  <rect
                    width="2"
                    height="20"
                    fill="black"
                    x={this.state.axisStart + (this.state.tickDist * (tick + 1)) - 1} 
                    y={this.state.ceilDist + 20}
                  />
              )}
              {[...Array(this.state.tickNum).keys()].map(
                (tick) =>
                <text 
                textAnchor="middle" 
                x={this.state.axisStart + (this.state.tickDist * (tick + 1)) - 1} 
                y={this.state.ceilDist + 55}>
                  {this.state.lowVal + (this.state.rangeVal * (tick + 1))}
                </text>
              )}
              {/* triangle rendering below */}
              {this.returnTri1()}
              {this.returnTri2()}
              <text textAnchor="middle" x={this.state.axisStart} y={this.state.ceilDist + 55}>{this.state.lowVal}</text>
              <text textAnchor="middle" x={this.state.axisStart + this.state.axisEnd} y={this.state.ceilDist + 55}>{this.state.lowVal + this.state.colNum * this.state.colNumVal}</text>
                        Sorry, please use a different browser.
            </svg>
            <br />
            <h4>Area Under Curve: <span ref={this.areaRef}></span> | First x-coordinate: {this.state.col11} | Second x-coordinate: {this.state.col21} </h4>
            {
              !this.state.configuredShapes
              ?
              <div></div>
              :
              <div>
                <div class="flex-container">
                  <div class="flex-child-one">
                    Question: <br/>
                    <textarea class="normal-curve-text" cols="60" rows="11" 
                        ref={this.qRef} 
                        defaultValue={defaultVal("Question")}
                      onInput={() => this.handleChange("Question", this.qRef.current.value, this.props.count)}>
                    </textarea>

                    <br/><br/>
                    <div class="color-box" style={{ backgroundColor: this.state.color1 }}></div>
                    <input type="text" 
                      ref={this.graph1keyRef} 
                      defaultValue={defaultVal("graph1key")}
                      onInput={() => this.handleChange("graph1key", this.graph1keyRef.current.value, this.props.count)}></input>
                    <br />

                    <div class="color-box" style={{ backgroundColor: this.state.color2 }}></div>
                    <input type="text" 
                      ref={this.graph2keyRef} 
                      defaultValue={defaultVal("graph2key")}
                      onInput={() => this.handleChange("graph2key", this.graph2keyRef.current.value, this.props.count)}></input>
                  </div>

                  <div class="flex-child-two">
                    <br/>
                    What csv column name do you want to assign to this question?
                    <br/>
                    {
                      this.props.editing
                      ?
                      <input type="text" ref={this.questionKeyRef} 
                      defaultValue={this.props.qToDisplay["normal-curve-question-key"]}
                      onInput={() => this.handleChange("normal-curve-question-key", this.questionKeyRef.current.value, this.props.count)}/>
                      :
                      <input type="text" ref={this.questionKeyRef} 
                      onInput={() => this.handleChange("normal-curve-question-key", this.questionKeyRef.current.value, this.props.count)}/>
                    }
                    <br/>
                    <b>Use letters only, the name must be unique, leave no space between letters.</b> <br/>
                    Recommedation: include your experiment name, this question number 
                    ({qNum}), and the question type (normalCurve)<br/>
                    <br/>
                    Please enter the csv column names for the graph key: <br/><br/>
                    <div class="color-box" style={{ backgroundColor: this.state.color1 }}></div>
                    {
                      this.props.editing
                      ?
                      <input type="text" ref={this.legendKey1Ref}
                      defaultValue={this.props.qToDisplay["normal-curve-legend-key1"]}
                      onInput={() => this.handleChange("normal-curve-legend-key1", this.legendKey1Ref.current.value, this.props.count)}></input>
                      :
                      <input type="text" ref={this.legendKey1Ref}
                      onInput={() => this.handleChange("normal-curve-legend-key1", this.legendKey1Ref.current.value, this.props.count)}></input>
                    }
                    <br/>
                    <div class="color-box" style={{ backgroundColor: this.state.color2 }}></div>
                    {
                      this.props.editing
                      ?
                      <input type="text" ref={this.legendKey2Ref}
                      defaultValue={this.props.qToDisplay["normal-curve-legend-key2"]}
                      onInput={() => this.handleChange("normal-curve-legend-key2", this.legendKey2Ref.current.value, this.props.count)}></input>
                      :
                      <input type="text" ref={this.legendKey2Ref}
                      onInput={() => this.handleChange("normal-curve-legend-key2", this.legendKey2Ref.current.value, this.props.count)}></input>
                    }
                  </div>
                </div>

                <div className="flex-child-three">
                  <span>Enter the width of the graph (each point in the curves is 
                    equivalent to 1 unit of width) </span>
                  <input ref={this.lengthRef} type="text" 
                    defaultValue={defaultCurveVal("axis-length")}
                    // name="axisLength" value={this.state.axisLength} 
                    // onChange={this.onChange}
                    />
                  <button onClick={() => {this.lengthSubmit(this.lengthRef.current.value)}}>
                    Change Width
                  </button>
                  <br/>

                  <span>Enter your preferred value for the width of each unit in the curve</span>
                  <input type="text" ref={this.colNumValRef}
                    defaultValue={defaultCurveVal("colNumVal")}></input>
                  <button onClick={() => this.updateColVal(this.colNumValRef.current.value)}>Change Unit Value</button>
                  <br />

                  <span>Enter your preferred value for the radius of each unit in the curve (2 - 5, inclusive)</span>
                  <input type="text" ref={this.radiusRef}
                    defaultValue={defaultCurveVal("circle-radius")}></input>
                  <button onClick={() => this.updateRadius(this.radiusRef.current.value)}>Change Radius</button>
                  <br />

                  <span>Enter your preferred number of ticks on the graph (equal parts must be divisible by x-axis width)</span>
                  <input type="text" ref={this.ticksRef}
                    defaultValue={defaultCurveVal("tickNum")}></input>
                  <button onClick={() => this.updateTicks(this.ticksRef.current.value)}>Change Tick Count</button>
                  <br />

                  <span>Enter your preferred starting position for curve 1, 
                    if you want to change it </span>
                  <input ref={this.startPos1Ref} type="text" 
                    // name="startPos1" value={this.state.startPos1} onChange={this.onChange}
                    defaultValue={defaultCurveVal("startPos1")}></input>
                  <button onClick={() => this.alterStartPos1(this.startPos1Ref.current.value)}>
                    Change Curve 1
                  </button>
                  <br/>

                  <input 
                  type="checkbox"
                  ref={this.toggleTriRef1}
                  onChange={this.toggleTri1} checked={this.state.fixCurve1}/>
                  <label for="toggle1"> Check to lock the position of the curve</label>
                  <p> || </p>

                  <label for="color1">Choose a color for curve 1: </label>
                  <select name="color1" id="color1" ref={this.color1Ref}
                    defaultValue={this.state.color1}>
                    <option value="CornflowerBlue">Blue</option>
                    <option value="Crimson">Red</option>
                    <option value="MediumSeaGreen">Green</option>
                    <option value="LightGray">Gray</option>
                  </select>
                  <input onClick={() => this.changeColor1()} type="submit" value="Submit"></input>
                  <br />

                  <span>Enter your preferred starting position for curve 2, 
                    if you want to change it </span>
                  <input ref={this.startPos2Ref} type="text" 
                    // name="startPos2" value={this.state.startPos2} onChange={this.onChange}
                    defaultValue={defaultCurveVal("startPos2")}></input>
                  <button onClick={() => this.alterStartPos2(this.startPos2Ref.current.value)}>
                    Change Curve 2
                  </button>
                  <br/>

                  <input 
                  type="checkbox"
                  ref={this.toggleTriRef2}
                  onChange={this.toggleTri2} checked={this.state.fixCurve2}/>
                  <label for="toggle2"> Check to lock the position of the curve</label>
                  <p> || </p>

                  <label for="color2">Choose a color for curve 2: </label>
                  <select name="color2" id="color2" ref={this.color2Ref}
                    defaultValue={this.state.color2}>
                    <option value="CornflowerBlue">Blue</option>
                    <option value="Crimson">Red</option>
                    <option value="MediumSeaGreen">Green</option>
                    <option value="LightGray">Gray</option>
                  </select>
                  <input onClick={() => this.changeColor2()} type="submit" value="Submit"></input>
                  <br />
                  <div>
                    <input 
                      type="checkbox" 
                      id="vehicle1" 
                      name="vehicle1" 
                      value="Bike" 
                      ref={this.checkBoxRef}
                      onChange={this.checkChange} checked={this.state.edgeLim}/>
                    <label for="vehicle1">Turn edge limiting on/off</label>
                  </div>
                </div>
              </div>
            }
            <br/>
            <button onClick={this.delete.bind(this)}>Delete</button>
          </div>
        </div>
        <br/><br/><br/>
      </div>
    )
  }
}

export default NormalCurve;