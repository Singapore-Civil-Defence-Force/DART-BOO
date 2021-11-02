import React, { useState, useRef } from "react";
import { Tooltip, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Draggable from "react-draggable";
import {
  setAnchor,
  updateEdges,
  setCurShape,
  updateSelected,
  deleteObject,
  updateObject,
} from "../actions/sheetActions";
import { setTool } from "../actions/toolActions";
import { boxSize } from "../config";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import FlipIcon from "@material-ui/icons/Flip";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  BALLOON_LIGHT,
  DOME,
  DUO_TENT,
  EU30I,
  EU65I,
  RUBBISH_BIN,
  TM18_2,
  TM18,
  TM36,
  TRAIL_TENT,
  getObjectSize,
  SINGLE_DOOR,
  DOUBLE_DOOR,
  SLIDING_DOOR,
  POCKET_DOOR,
  BIFOLD_DOOR,
  WINDOW_32,
  WINDOW_48,
  WINDOW_60,
  SINK,
  DOUBLE_SINK,
  SHOWER_RECT,
  SHOWER_SQUARE,
  SOFA,
  COFFEE_TABLE,
  END_TABLE,
  LOVESEAT,
  TABLE_RECT,
  TABLE_ROUND,
  QUEEN_BED,
} from "./objectInfo";
import singleDoor from "../images/objects/singleDoor.png";
import singleDoor90 from "../images/objects/singleDoor90.png";
import singleDoor180 from "../images/objects/singleDoor180.png";
import singleDoor270 from "../images/objects/singleDoor270.png";
import doubleDoor from "../images/objects/doubleDoor.png";
import doubleDoor90 from "../images/objects/doubleDoor90.png";
import doubleDoor180 from "../images/objects/doubleDoor180.png";
import doubleDoor270 from "../images/objects/doubleDoor270.png";
import slidingDoor from "../images/objects/slidingDoor.png";
import slidingDoor90 from "../images/objects/slidingDoor90.png";
import slidingDoor180 from "../images/objects/slidingDoor180.png";
import slidingDoor270 from "../images/objects/slidingDoor270.png";
import pocketDoor from "../images/objects/pocketDoor.png";
import pocketDoor90 from "../images/objects/pocketDoor90.png";
import pocketDoor180 from "../images/objects/pocketDoor180.png";
import pocketDoor270 from "../images/objects/pocketDoor270.png";
import bifoldDoor from "../images/objects/bifoldDoor.png";
import bifoldDoor90 from "../images/objects/bifoldDoor90.png";
import bifoldDoor180 from "../images/objects/bifoldDoor180.png";
import bifoldDoor270 from "../images/objects/bifoldDoor270.png";
import window from "../images/objects/window.png";
import window90 from "../images/objects/window90.png";
import window180 from "../images/objects/window180.png";
import window270 from "../images/objects/window270.png";
import doubleSink from "../images/objects/doubleSink.png";
import doubleSink90 from "../images/objects/doubleSink90.png";
import doubleSink180 from "../images/objects/doubleSink180.png";
import doubleSink270 from "../images/objects/doubleSink270.png";
import dryer from "../images/objects/dryer.png";
import sink from "../images/objects/sink.png";
import sink90 from "../images/objects/sink90.png";
import sink180 from "../images/objects/sink180.png";
import sink270 from "../images/objects/sink270.png";
import showerRect from "../images/objects/showerRect.png";
import showerRect90 from "../images/objects/showerRect90.png";
import showerRect180 from "../images/objects/showerRect180.png";
import showerRect270 from "../images/objects/showerRect270.png";
import showerSquare from "../images/objects/showerSquare.png";
import endTable from "../images/objects/endTable.png";
import coffeeTable from "../images/objects/coffeeTable.png";
import coffeeTable90 from "../images/objects/coffeeTable90.png";
import coffeeTable180 from "../images/objects/coffeeTable180.png";
import coffeeTable270 from "../images/objects/coffeeTable270.png";
import loveSeat from "../images/objects/loveSeat.png";
import loveSeat90 from "../images/objects/loveSeat90.png";
import loveSeat180 from "../images/objects/loveSeat180.png";
import loveSeat270 from "../images/objects/loveSeat270.png";
import sofa from "../images/objects/sofa.png";
import sofa90 from "../images/objects/sofa90.png";
import sofa180 from "../images/objects/sofa180.png";
import sofa270 from "../images/objects/sofa270.png";
import tableRound from "../images/objects/tableRound.png";
import tableRect from "../images/objects/tableRect.png";
import tableRect90 from "../images/objects/tableRect90.png";
import tableRect180 from "../images/objects/tableRect180.png";
import tableRect270 from "../images/objects/tableRect270.png";
import queenBed from "../images/objects/queenBed.png";
import queenBed90 from "../images/objects/queenBed90.png";
import queenBed180 from "../images/objects/queenBed180.png";
import queenBed270 from "../images/objects/queenBed270.png";
import balloonLight from "../images/objects/BOO/balloon-light.png";
import dome from "../images/objects/BOO/dome.png";

import duoTent from "../images/objects/BOO/duo_tent.png";
import duoTent90 from "../images/objects/BOO/duo_tent90.png";
import duoTent180 from "../images/objects/BOO/duo_tent180.png";
import duoTent270 from "../images/objects/BOO/duo_tent270.png";

import eu30i from "../images/objects/BOO/EU30I.png";
import eu65i from "../images/objects/BOO/EU65I.png";
import tm18_2 from "../images/objects/BOO/TM18-2.png";
import tm18_290 from "../images/objects/BOO/TM18-290.png";
import tm18_2180 from "../images/objects/BOO/TM18-2180.png";
import tm18_2270 from "../images/objects/BOO/TM18-2270.png";

import tm18 from "../images/objects/BOO/TM18.png";
import tm36 from "../images/objects/BOO/TM36.png";
import trailTent from "../images/objects/BOO/trail_tent.png";
import rubbishBin from "../images/objects/BOO/rubbish-bin.png";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  editBar: {
    position: "fixed",
    top: 84,
    right: 20,
    padding: 0,
  },
  button: {
    padding: 12,
    minWidth: 24,
  },
});

function ObjectEl({ id, type, position }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(true);
  const [imgRotation, setImgRotation] = useState(0);
  const [imgDirection, setImgDirection] = useState(1);
  const scale = useSelector((state) => state.sheet.scale);
  const containerRef = useRef();
  const editBarRef = useRef();

  const handleMouseDown = (e) => {
    if (
      !containerRef.current.contains(e.target) &&
      editBarRef.current &&
      !editBarRef.current.contains(e.target)
    ) {
      setEditMode(false);
    }
  };

  React.useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleMouseDown, false);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleMouseDown, false);
    };
  }, []);

  const rotateLeft = () => {
    switch (imgRotation) {
      case 0:
        setImgRotation(270);
        break;
      case 90:
        setImgRotation(0);
        break;
      case 180:
        setImgRotation(90);
        break;
      default:
        setImgRotation(180);
    }
  };

  const rotateRight = () => {
    switch (imgRotation) {
      case 0:
        setImgRotation(90);
        break;
      case 90:
        setImgRotation(180);
        break;
      case 180:
        setImgRotation(270);
        break;
      default:
        setImgRotation(0);
    }
  };

  const flipImg = () => {
    if (imgDirection === 1) {
      setImgDirection(-1);
    } else {
      setImgDirection(1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteObject(id));
  };

  const isEditMode = () => {
    setEditMode(true);
    dispatch(setTool("POINTER"));
    dispatch(setAnchor(null));
    dispatch(setCurShape(null));
    dispatch(updateEdges([]));
    dispatch(updateSelected([]));
  };

  const getImageWidth = (objectType) => {
    const objectWidth = getObjectSize(objectType).w;
    //const scaleInches = scale.ft * 12 + scale.in;
    const scaleInches = scale.metre;
    return Math.max(
      (boxSize + 1) * Math.round(objectWidth / scaleInches),
      boxSize + 1
    );
    //return Math.max((boxSize + 1) * Math.round(objectWidth), boxSize + 1);
  };

  const getImageHeight = (objectType) => {
    const objectHeight = getObjectSize(objectType).h;
    //const scaleInches = scale.ft * 12 + scale.in;
    const scaleInches = scale.metre;
    //return Math.max((boxSize + 1) * Math.round(objectHeight), boxSize + 1);
    return Math.max(
      (boxSize + 1) * Math.round(objectHeight / scaleInches),
      boxSize + 1
    );
  };

  const getImageSrc = (objectType) => {
    switch (objectType) {
      case BALLOON_LIGHT:
        return balloonLight;
      case DOME:
        return dome;
      case DUO_TENT:
        return imgRotation === 0
          ? duoTent
          : imgRotation === 90
          ? duoTent90
          : imgRotation === 180
          ? duoTent180
          : duoTent270;
      case EU30I:
        return eu30i;
      case EU65I:
        return eu65i;
      case RUBBISH_BIN:
        return rubbishBin;
      case TM18_2:
        return imgRotation === 0
          ? tm18_2
          : imgRotation === 90
          ? tm18_290
          : imgRotation === 180
          ? tm18_2180
          : tm18_2270;
      case TM18:
        return tm18;
      case TM36:
        return tm36;
      case TRAIL_TENT:
        return trailTent;
      case SINGLE_DOOR:
        return imgRotation === 0
          ? singleDoor
          : imgRotation === 90
          ? singleDoor90
          : imgRotation === 180
          ? singleDoor180
          : singleDoor270;
      case DOUBLE_DOOR:
        return imgRotation === 0
          ? doubleDoor
          : imgRotation === 90
          ? doubleDoor90
          : imgRotation === 180
          ? doubleDoor180
          : doubleDoor270;
      case SLIDING_DOOR:
        return imgRotation === 0
          ? slidingDoor
          : imgRotation === 90
          ? slidingDoor90
          : imgRotation === 180
          ? slidingDoor180
          : slidingDoor270;
      case POCKET_DOOR:
        return imgRotation === 0
          ? pocketDoor
          : imgRotation === 90
          ? pocketDoor90
          : imgRotation === 180
          ? pocketDoor180
          : pocketDoor270;
      case BIFOLD_DOOR:
        return imgRotation === 0
          ? bifoldDoor
          : imgRotation === 90
          ? bifoldDoor90
          : imgRotation === 180
          ? bifoldDoor180
          : bifoldDoor270;
      case WINDOW_32:
      case WINDOW_48:
      case WINDOW_60:
        return imgRotation === 0
          ? window
          : imgRotation === 90
          ? window90
          : imgRotation === 180
          ? window180
          : window270;
      case DOUBLE_SINK:
        return imgRotation === 0
          ? doubleSink
          : imgRotation === 90
          ? doubleSink90
          : imgRotation === 180
          ? doubleSink180
          : doubleSink270;
      case SINK:
        return imgRotation === 0
          ? sink
          : imgRotation === 90
          ? sink90
          : imgRotation === 180
          ? sink180
          : sink270;
      case SHOWER_RECT:
        return imgRotation === 0
          ? showerRect
          : imgRotation === 90
          ? showerRect90
          : imgRotation === 180
          ? showerRect180
          : showerRect270;
      case SHOWER_SQUARE:
        return showerSquare;
      case LOVESEAT:
        return imgRotation === 0
          ? loveSeat
          : imgRotation === 90
          ? loveSeat90
          : imgRotation === 180
          ? loveSeat180
          : loveSeat270;
      case SOFA:
        return imgRotation === 0
          ? sofa
          : imgRotation === 90
          ? sofa90
          : imgRotation === 180
          ? sofa180
          : sofa270;
      case COFFEE_TABLE:
        return imgRotation === 0
          ? coffeeTable
          : imgRotation === 90
          ? coffeeTable90
          : imgRotation === 180
          ? coffeeTable180
          : coffeeTable270;
      case END_TABLE:
        return endTable;
      case TABLE_ROUND:
        return tableRound;
      case TABLE_RECT:
        return imgRotation === 0
          ? tableRect
          : imgRotation === 90
          ? tableRect90
          : imgRotation === 180
          ? tableRect180
          : tableRect270;
      case QUEEN_BED:
        return imgRotation === 0
          ? queenBed
          : imgRotation === 90
          ? queenBed90
          : imgRotation === 180
          ? queenBed180
          : queenBed270;
      default:
        return singleDoor;
    }
  };

  return (
    <>
      <Draggable
        onDrag={(e, data) => {
          dispatch(
            updateObject({
              id,
              position: {
                x: data.x,
                y: data.y,
              },
            })
          );
        }}
        defaultPosition={position}
        bounds="parent"
        grid={[boxSize + 1, boxSize + 1]}
        scale={1}
      >
        <div
          className={classes.root}
          ref={containerRef}
          onClick={isEditMode}
          style={editMode ? { border: "1px solid #4281ff" } : {}}
        >
          <img
            draggable="false"
            src={getImageSrc(type)}
            height={
              imgRotation === 90 || imgRotation === 270
                ? getImageWidth(type)
                : getImageHeight(type)
            }
            width={
              imgRotation === 90 || imgRotation === 270
                ? getImageHeight(type)
                : getImageWidth(type)
            }
            style={{
              imageRendering: "pixelated",
              WebkitTransform: `scaleX(${imgDirection})`,
              transform: `scaleX(${imgDirection})`,
              userDrag: "none",
              userSelect: "none",
              MozUserDrag: "none",
              WebkitUserDrag: "none",
              WebkitUserSelect: "none",
              msUserSelect: "none",
              msUserDrag: "none",
            }}
          />
        </div>
      </Draggable>

      {editMode ? (
        <Paper className={classes.editBar} ref={editBarRef}>
          <Tooltip title="Rotate Left" placement="bottom">
            <Button onClick={rotateLeft} className={classes.button}>
              <RotateLeftIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Rotate Right" placement="bottom">
            <Button onClick={rotateRight} className={classes.button}>
              <RotateRightIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Flip Object" placement="bottom">
            <Button onClick={flipImg} className={classes.button}>
              <FlipIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Delete Object" placement="bottom">
            <Button
              onClick={handleDelete}
              className={classes.button}
              style={{ color: "#bc0000" }}
            >
              <DeleteOutlineIcon />
            </Button>
          </Tooltip>
        </Paper>
      ) : null}
    </>
  );
}

export default ObjectEl;
