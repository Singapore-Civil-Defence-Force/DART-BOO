import React from "react";
import { boxSize } from "../config";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
  Paper,
  Modal,
  Tabs,
  Tab,
  ButtonGroup,
  Divider,
} from "@material-ui/core";
import { addText, addObject } from "../actions/sheetActions";
import {
  setAnchor,
  updateEdges,
  setCurShape,
  updateSelected,
  setNewFile,
  loadFile,
} from "../actions/sheetActions";
import { setTool } from "../actions/toolActions";
import { useDispatch } from "react-redux";
import { getState } from "../index";
import LZUTF8 from "lzutf8";
import html2canvas from "html2canvas";

import logo from "../images/dartlogo.jpeg";
import { getObjectSize } from "../components/objectInfo";
import singleDoor from "../images/objects/singleDoor.png";
import doubleDoor from "../images/objects/doubleDoor.png";
import slidingDoor from "../images/objects/slidingDoor.png";
import pocketDoor from "../images/objects/pocketDoor.png";
import bifoldDoor from "../images/objects/bifoldDoor.png";
import window from "../images/objects/window.png";
import doubleSink from "../images/objects/doubleSink.png";
import dryer from "../images/objects/dryer.png";
import sink from "../images/objects/sink.png";
import coffeeTable from "../images/objects/coffeeTable.png";
import endTable from "../images/objects/endTable.png";
import sofa from "../images/objects/sofa.png";
import loveSeat from "../images/objects/loveSeat.png";
import tableRound from "../images/objects/tableRound.png";
import tableRect from "../images/objects/tableRect.png";
import queenBed from "../images/objects/queenBed.png";
import balloonLight from "../images/objects/BOO/balloon-light.png";
import dome from "../images/objects/BOO/dome.png";
import duoTent from "../images/objects/BOO/duo_tent.png";
import eu30i from "../images/objects/BOO/EU30I.png";
import eu65i from "../images/objects/BOO/EU65I.png";
import tm18_2 from "../images/objects/BOO/TM18-2.png";
import tm18 from "../images/objects/BOO/TM18.png";
import tm36 from "../images/objects/BOO/TM36.png";
import trailTent from "../images/objects/BOO/trail_tent.png";
import rubbishBin from "../images/objects/BOO/rubbish-bin.png";

const useStyles = makeStyles({
  appBarContainer: {
    padding: "0px 24px 0px 20px",
    color: "#fff",
    background: "#323232",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    height: 64,
    borderBottom: "1px solid #000",
  },
  button: {
    marginTop: 12,
    color: "#fff",
    background: "#43505b",
    "&:hover": {
      background: "#5d6e7c",
    },
  },
  menuButton: {
    color: "#f0f0f0",
    minWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
    textTransform: "none",
    "&:hover": {
      background: "#43505b",
    },
    marginRight: 8,
  },
  justifyRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuItem: {
    minWidth: 150,
  },
  paper: {
    position: "absolute",
    outline: 0,
    height: 680,
    top: 60,
    left: 200,
  },
  warningPaper: {
    position: "absolute",
    outline: 0,
    width: 400,
    top: "calc(50vh - 150px)",
    left: "calc(50vw - 200px)",
  },
  tutorialPaper: {
    position: "absolute",
    outline: 0,
    width: 1000,
    top: "calc(50vh - 300px)",
    left: "calc(50vw - 500px)",
  },
  modalContent: {
    maxWidth: 480,
    height: "calc(100vh - 64px - 32px)",
    overflowY: "scroll",
    padding: 24,
  },
  imageContainer: {
    display: "inline-block",
    width: 150,
    padding: "8px 24px 8px 24px",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  image: {
    paddingBottom: 8,
  },
  gif: {
    maxHeight: 390,
  },
});

const objects = {
  tents: [
    {
      id: "TM36",
      file: tm36,
      label: "TM36",
    },
    {
      id: "TM18_2",
      file: tm18_2,
      label: "TM18",
    },
    {
      id: "DOME",
      file: dome,
      label: "Festival Dome",
    },
    {
      id: "DUO_TENT",
      file: duoTent,
      label: "Ensuite Duo Tent",
    },
    {
      id: "TRAIL_TENT",
      file: trailTent,
      label: "OZ Trail 6 Men Tent",
    },
  ],
  doors: [
    {
      id: "SINGLE_DOOR",
      file: singleDoor,
      label: 'Single Door"',
    },
    {
      id: "DOUBLE_DOOR",
      file: doubleDoor,
      label: 'Double Door"',
    },
    {
      id: "SLIDING_DOOR",
      file: slidingDoor,
      label: 'Sliding Door"',
    },
    {
      id: "POCKET_DOOR",
      file: pocketDoor,
      label: 'Pocket Door"',
    },
    {
      id: "BIFOLD_DOOR",
      file: bifoldDoor,
      label: 'Bi-fold Door"',
    },
  ],
  windows: [
    {
      id: "WINDOW_32",
      file: window,
      label: 'Window - 32"',
    },
    {
      id: "WINDOW_48",
      file: window,
      label: 'Window - 48"',
    },
    {
      id: "WINDOW_60",
      file: window,
      label: 'Window - 60"',
    },
  ],
  livingRoom: [
    {
      id: "SOFA",
      file: sofa,
      label: 'Sofa - 84"',
    },
    {
      id: "COFFEE_TABLE",
      file: coffeeTable,
      label: 'Coffee Table - 40"',
    },
  ],
  diningRoom: [
    {
      id: "TABLE_ROUND",
      file: tableRound,
      label: 'Round Table - 36"',
    },
    {
      id: "TABLE_RECT",
      file: tableRect,
      label: 'Rectangular Table - 48"',
    },
  ],
  bedroom: [
    {
      id: "QUEEN_BED",
      file: queenBed,
      label: 'Queen Bed - 60"x80"',
    },
  ],
};

function AppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [textboxAnchor, setTextboxAnchor] = React.useState(null);
  const [fileAnchor, setFileAnchor] = React.useState(null);
  const [objectModalOpen, setObjectModalOpen] = React.useState(false);
  const [warningModalOpen, setWarningModalOpen] = React.useState(false);
  const [curTab, setCurTab] = React.useState(0);
  const [toolbarTab, setToolbarTab] = React.useState(0);

  const handleClickTextbox = (event) => {
    setTextboxAnchor(event.currentTarget);
  };

  const handleClickFile = (event) => {
    setFileAnchor(event.currentTarget);
  };

  const handleCloseTextbox = () => {
    setTextboxAnchor(null);
  };

  const handleCloseFile = () => {
    setFileAnchor(null);
  };

  const insertLabel = () => {
    dispatch(addText("label"));
    handleCloseTextbox();
  };

  const newFile = () => {
    dispatch(setNewFile());
    handleWarningModalClose();
  };

  const handleObjectModalClose = () => {
    setObjectModalOpen(false);
  };

  const handleWarningModalClose = () => {
    setWarningModalOpen(false);
    handleCloseFile();
  };

  const openObjectModal = () => {
    dispatch(setTool("POINTER"));
    dispatch(setAnchor(null));
    dispatch(setCurShape(null));
    dispatch(updateEdges([]));
    dispatch(updateSelected([]));
    setObjectModalOpen(true);
  };

  const openWarningModal = () => {
    setWarningModalOpen(true);
  };

  const changeTab = (event, newValue) => {
    setCurTab(newValue);
  };

  const placeObject = (objectType) => {
    dispatch(addObject(objectType));
  };

  const getImgHeight = (objectType) => {
    const objectHeight = getObjectSize(objectType).h;
    return Math.round((objectHeight / 36) * 80);
  };

  const handleChangeToolbarTab = (event, newValue) => {
    setToolbarTab(newValue);
  };

  /**
   * Calculates the image x & y offsets and width & height
   */
  const calImgCrop = (state) => {
    const padding = 17 * 2;
    let xOffset = 999999999;
    let yOffset = 999999999;
    let maxX = 0;
    let maxY = 0;
    state.objects.forEach((object) => {
      if (object.position.x < xOffset) {
        xOffset = object.position.x;
      }
      if (object.position.x > maxX) {
        maxX = object.position.x;
      }
      if (object.position.y < yOffset) {
        yOffset = object.position.y;
      }
      if (object.position.y > maxY) {
        maxY = object.position.y;
      }
    });
    state.text.forEach((textBox) => {
      if (textBox.position.x < xOffset) {
        xOffset = textBox.position.x;
      }
      if (textBox.position.x > maxX) {
        maxX = textBox.position.x;
      }
      if (textBox.position.y < yOffset) {
        yOffset = textBox.position.y;
      }
      if (textBox.position.y > maxY) {
        maxY = textBox.position.y;
      }
    });
    for (let row = 0; row < state.walls.length; row++) {
      for (let col = 0; col < state.walls[0].length; col++) {
        // check for a wall
        if (state.walls[row][col] === true) {
          // calc x & y offsets
          const x = col * (boxSize + 1);
          const y = row * (boxSize + 1);
          if (x < xOffset) {
            xOffset = x;
          }
          if (x + (boxSize + 1) > maxX) {
            maxX = x + (boxSize + 1);
          }
          if (y < yOffset) {
            yOffset = y;
          }
          if (y + (boxSize + 1) > maxY) {
            maxY = y + (boxSize + 1);
          }
        }
      }
    }
    return {
      xOffset: Math.max(xOffset - padding, 0) + 54,
      yOffset: Math.max(yOffset - padding, 0) + 64,
      width: maxX - xOffset + padding * 2,
      height: maxY - yOffset + padding * 2,
    };
  };

  const saveFile = () => {
    const curState = getState().sheet;
    const cropData = calImgCrop(curState);
    // Create preview image
    html2canvas(document.querySelector("#grid-container"), {
      x: cropData.xOffset,
      y: cropData.yOffset,
      width: cropData.width,
      height: cropData.height,
    }).then((canvas) => {
      document.body.appendChild(canvas);
    });
    // Save file state
    const state = {
      scale: curState.scale,
      text: curState.text,
      objects: curState.objects,
      walls: curState.walls,
    };
    const compressedJSON = LZUTF8.compress(JSON.stringify(state));
    dispatch(loadFile(JSON.parse(LZUTF8.decompress(compressedJSON))));
  };

  return (
    <div>
      <Grid container className={classes.appBarContainer}>
        <Grid item>
          <img
            src={logo}
            style={{
              height: 38,
              paddingRight: 18,
              paddingLeft: 4,
              paddingTop: 10,
            }}
          />
        </Grid>

        <Grid item>
          <Grid container>
            <Grid item>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 700,
                  paddingLeft: 4,
                  fontFamily: "'Mulish', sans-serif",
                }}
              >
                DART Base of Operations Floorplan
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Button
                    size="small"
                    className={classes.menuButton}
                    onClick={handleClickFile}
                  >
                    File
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    size="small"
                    className={classes.menuButton}
                    onClick={handleClickTextbox}
                  >
                    Place Label
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    size="small"
                    className={classes.menuButton}
                    onClick={openObjectModal}
                  >
                    Place Equipment
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* 
        <Grid item xs>
          <div className={classes.justifyRight}>
            <ButtonGroup variant="contained" color='primary'>
              <Button className={classes.button} onClick={openTutorialModal}>
                Tutorial
            </Button>
            </ButtonGroup>
          </div>
        </Grid> 
           */}
      </Grid>

      <Menu
        anchorEl={textboxAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom" }}
        transformOrigin={{ vertical: "top" }}
        keepMounted
        open={Boolean(textboxAnchor)}
        onClose={handleCloseTextbox}
      >
        <Typography variant="overline" style={{ paddingLeft: 16 }}>
          Text Style:
        </Typography>
        <MenuItem onClick={insertLabel} className={classes.menuItem}>
          Label
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={fileAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom" }}
        transformOrigin={{ vertical: "top" }}
        keepMounted
        open={Boolean(fileAnchor)}
        onClose={handleCloseFile}
      >
        <MenuItem onClick={saveFile} className={classes.menuItem}>
          Save
        </MenuItem>
        <Divider />
        <MenuItem onClick={openWarningModal} className={classes.menuItem}>
          New
        </MenuItem>
        <MenuItem className={classes.menuItem}>Open</MenuItem>
      </Menu>

      <Modal
        open={objectModalOpen}
        onClose={handleObjectModalClose}
        aria-labelledby="place-object"
      >
        <Paper className={classes.paper}>
          <Grid container>
            <Grid
              item
              style={{ borderRight: "1px solid #d5d5d5", height: 680 }}
            >
              <Tabs
                orientation="vertical"
                value={curTab}
                onChange={changeTab}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Tents" />
                <Tab label="Lanes" />
                <Tab label="Doors" />
                <Tab label="Tables" />
                <Tab label="Equipment #1" />
                <Tab label="Equipment #2" />
                <Tab label="Equipment #3" />
                <Tab label="Equipment #4" />
              </Tabs>
            </Grid>

            <Grid item xs>
              {curTab === 0 ? ( // Tents
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.tents.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) * 10 }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : curTab === 1 ? ( // WINDOWS
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.windows.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : curTab === 2 ? ( // KITCHEN
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.doors.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : curTab === 3 ? ( // BATHROOM
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.diningRoom.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : curTab === 4 ? ( // LIVING ROOM
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.livingRoom.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : curTab === 5 ? ( // DINING ROOM
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.diningRoom.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : curTab === 6 ? ( // BEDROOM
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.bedroom.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : curTab === 7 ? ( // LAUNDRY
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.laundry.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : curTab === 8 ? ( // STAIRS
                <div className={classes.modalContent}>
                  <Grid container spacing={1}>
                    {objects.stairs.map((object) => (
                      <Grid item xs={6}>
                        <div
                          className={classes.imageContainer}
                          onClick={() => placeObject(object.id)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: 80,
                            }}
                          >
                            <img
                              src={object.file}
                              className={classes.image}
                              style={{ height: getImgHeight(object.id) }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {object.label}
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
      </Modal>

      <Modal open={warningModalOpen} onClose={null} aria-labelledby="warning">
        <Paper className={classes.warningPaper}>
          <div style={{ padding: 24 }}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              Warning: Creating a new plan will override the current plan.
            </Typography>
          </div>

          <Grid container>
            <Grid item xs={6} style={{ padding: 8 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={newFile}
              >
                New Plan
              </Button>
            </Grid>
            <Grid item xs={6} style={{ padding: 8 }}>
              <Button
                variant="contained"
                color="default"
                fullWidth
                onClick={handleWarningModalClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
}

export default AppBar;
