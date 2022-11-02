// import { Slider } from 'antd'
import { Row, Col, Progress, Modal } from "antd";
import { red, green } from "@ant-design/colors";
import styles from "./styles.module.less";

import React, { useState } from "react";
import Slider from "react-slick";
import { ScreenShotData } from "../ScreenShotData";
import {
  DeleteOutlined,
  DashOutlined ,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { concat, slice } from "lodash";

const ScreenShotSlider = () => {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    fade: true,
    color: "red",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
  const LENGTH = 2;
  const DATA = [...Array(LENGTH)];
  const IMAGE_SRC = "https://source.unsplash.com/random";
  const LIMIT = 1;

  const [open, setOpen] = useState(false);

  const [showMore, setShowMore] = useState(true);
  const [list, setList] = useState(slice(DATA, 0, LIMIT));
  const [index, setIndex] = useState(LIMIT);
  const loadMore = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < LENGTH - 1;
    const newList = concat(list, slice(DATA, index,));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };
  // const onChange = (currentSlide: number) => {
  //   console.log(currentSlide);
  // };
  const info = () => {
    Modal.info({
      title: "This is a notification message",
      content: (
        <div>
          orem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Why do we use it? It is a long
          established fact that a reader will be distracted by the readable
          content of a page when looking at its layout. The point of using Lorem
          Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using 'Content here, content here', making it look like
          readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search
          for 'lorem ipsum' will uncover many web sites still in their infancy.
          Various versions have evolved over the years, sometimes by accident,
          sometimes on purpose (injected humour and the like).
        </div>
      ),
      onOk() {},
    });
  };
  console.log(ScreenShotData, "screenshotdata");

  return (
    <div>
      <div style={{ background: "Light" }}>
        {showMore && (
         
          <div className={styles.seeMore}>
                <DashOutlined  onClick={loadMore}/>
          </div>
      
        )}
        <Slider {...settings}>
          <div>
            <h3>
              Time: <strong> 09:00 - 10:00</strong>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {ScreenShotData.map((data: any) => {
                  return (
                    <Col span={4}>
                      <div>
                        {list.map(() => (
                          <>
                            <img
                              src={IMAGE_SRC}
                              alt="screenshot"
                              style={{
                                width: "100%",
                                height: "100px",
                                marginTop: "100px",
                              }}
                              onClick={() => setOpen(true)}
                            />
                            <Row gutter={[16, 16]}>
                              <Col>
                                <div>
                                  <Progress
                                    steps={10}
                                    strokeColor={[green[6], green[6], red[5]]}
                                    percent={data.porgress}
                                  />
                                </div>
                              </Col>

                              <Col>
                                <div>
                                  <span className={styles.reportTimer}>
                                    {data.time}
                                  </span>
                                </div>
                              </Col>
                            </Row>{" "}
                          </>
                        ))}
                      </div>
                      <Modal
                        title="Screenshot Detail"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                      >
                        <Row>
                          <Col span={8}>
                            {" "}
                            <h1>11:30 am</h1>
                          </Col>
                          <Col span={8} offset={8}>
                            <h3>
                              {" "}
                              <DeleteOutlined style={{ marginLeft: "200px" }} />
                              Remove
                            </h3>
                          </Col>
                        </Row>
                        <h3>Active Window</h3>
                        <h4>index.tsx visual studio code</h4>
                        <h2>Memo</h2>-<h2>Activity</h2>
                        <h4>Activity Level</h4>
                        <Row>
                          <Col span={8}>Active 6 of 10 am</Col>
                          <Col span={8} offset={8}>
                            <Progress
                              percent={60}
                              steps={5}
                              strokeColor={[green[6], green[6], red[5]]}
                              style={{ marginLeft: "200px" }}
                            />
                          </Col>
                        </Row>
                        <h1 onClick={info}>
                          {" "}
                          <QuestionCircleOutlined /> what is activity level
                        </h1>
                      </Modal>
                    </Col>
                  );
                })}
              </Row>
            </h3>
          </div>
          <div>
            <h3>
              <span className={styles.reportTime}>
                Time: <strong> 10:00 - 11:00</strong>
              </span>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {ScreenShotData.map((data: any) => {
                  return (
                    <Col span={4}>
                      <div>
                        {list.map(() => (
                          <>
                            <img
                              src={data.path}
                              alt="no screenshot"
                              style={{
                                width: "100%",
                                height: "100px",
                                marginTop: "100px",
                              }}
                              onClick={() => setOpen(true)}
                            />
                            <Row gutter={[16, 16]}>
                              <Col>
                                <div>
                                  <Progress
                                    steps={10}
                                    strokeColor={[green[6], green[6], red[5]]}
                                    percent={data.porgress}
                                  />
                                </div>
                              </Col>

                              <Col>
                                <div>
                                  <span className={styles.reportTimer}>
                                    {data.time}
                                  </span>
                                </div>
                              </Col>
                            </Row>{" "}
                          </>
                        ))}
                      </div>
                      <Modal
                        title="Screenshot Detail"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                      >
                        <Row>
                          <Col span={8}>
                            {" "}
                            <h1>11:30 am</h1>
                          </Col>
                          <Col span={8} offset={8}>
                            <h3>
                              {" "}
                              <DeleteOutlined style={{ marginLeft: "200px" }} />
                              Remove
                            </h3>
                          </Col>
                        </Row>
                        <h3>Active Window</h3>
                        <h4>index.tsx visual studio code</h4>
                        <h2>Memo</h2>-<h2>Activity</h2>
                        <h4>Activity Level</h4>
                        <Row>
                          <Col span={8}>Active 6 of 10 am</Col>
                          <Col span={8} offset={8}>
                            <Progress
                              percent={60}
                              steps={5}
                              strokeColor={[green[6], green[6], red[5]]}
                              style={{ marginLeft: "200px" }}
                            />
                          </Col>
                        </Row>
                        <h1 onClick={info}>
                          {" "}
                          <QuestionCircleOutlined /> what is activity level
                        </h1>
                      </Modal>
                    </Col>
                  );
                })}
              </Row>
            </h3>
          </div>
          <div>
            <h3>
              Time: <strong> 11:00 - 12:00</strong>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {ScreenShotData.map((data: any) => {
                  return (
                    <Col span={4}>
                      <div>
                        {list.map(() => (
                          <>
                            <img
                              src={IMAGE_SRC}
                              alt="no"
                              style={{
                                width: "100%",
                                height: "100px",
                                marginTop: "100px",
                              }}
                              onClick={() => setOpen(true)}
                            />
                            <Row gutter={[16, 16]}>
                              <Col>
                                <div>
                                  <Progress
                                    steps={10}
                                    strokeColor={[green[6], green[6], red[5]]}
                                    percent={data.porgress}
                                  />
                                </div>
                              </Col>

                              <Col>
                                <div>
                                  <span className={styles.reportTimer}>
                                    {data.time}
                                  </span>
                                </div>
                              </Col>
                            </Row>{" "}
                          </>
                        ))}
                      </div>
                      <Modal
                        title="Screenshot Detail"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                      >
                        <Row>
                          <Col span={8}>
                            {" "}
                            <h1>11:30 am</h1>
                          </Col>
                          <Col span={8} offset={8}>
                            <h3>
                              {" "}
                              <DeleteOutlined style={{ marginLeft: "200px" }} />
                              Remove
                            </h3>
                          </Col>
                        </Row>
                        <h3>Active Window</h3>
                        <h4>index.tsx visual studio code</h4>
                        <h2>Memo</h2>-<h2>Activity</h2>
                        <h4>Activity Level</h4>
                        <Row>
                          <Col span={8}>Active 6 of 10 am</Col>
                          <Col span={8} offset={8}>
                            <Progress
                              percent={60}
                              steps={5}
                              strokeColor={[green[6], green[6], red[5]]}
                              style={{ marginLeft: "200px" }}
                            />
                          </Col>
                        </Row>
                        <h1 onClick={info}>
                          {" "}
                          <QuestionCircleOutlined /> what is activity level
                        </h1>
                      </Modal>
                    </Col>
                  );
                })}
              </Row>
            </h3>
          </div>
          <div>
            <h3>
              {" "}
              Time: <strong> 01:00 - 02:00</strong>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {ScreenShotData.map((data: any) => {
                  return (
                    <Col span={4}>
                      <div>
                        {list.map(() => (
                          <>
                            <img
                              src={data.path}
                              alt="this screenshot"
                              style={{
                                width: "100%",
                                height: "100px",
                                marginTop: "100px",
                              }}
                              onClick={() => setOpen(true)}
                            />
                            <Row gutter={[16, 16]}>
                              <Col>
                                <div>
                                  <Progress
                                    steps={10}
                                    strokeColor={[green[6], green[6], red[5]]}
                                    percent={data.porgress}
                                  />
                                </div>
                              </Col>

                              <Col>
                                <div>
                                  <span className={styles.reportTimer}>
                                    {data.time}
                                  </span>
                                </div>
                              </Col>
                            </Row>{" "}
                          </>
                        ))}
                      </div>
                      <Modal
                        title="Screenshot Detail"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                      >
                        <Row>
                          <Col span={8}>
                            {" "}
                            <h1>11:30 am</h1>
                          </Col>
                          <Col span={8} offset={8}>
                            <h3>
                              {" "}
                              <DeleteOutlined style={{ marginLeft: "200px" }} />
                              Remove
                            </h3>
                          </Col>
                        </Row>
                        <h3>Active Window</h3>
                        <h4>index.tsx visual studio code</h4>
                        <h2>Memo</h2>-<h2>Activity</h2>
                        <h4>Activity Level</h4>
                        <Row>
                          <Col span={8}>Active 6 of 10 am</Col>
                          <Col span={8} offset={8}>
                            <Progress
                              percent={60}
                              steps={5}
                              strokeColor={[green[6], green[6], red[5]]}
                              style={{ marginLeft: "200px" }}
                            />
                          </Col>
                        </Row>
                        <h1 onClick={info}>
                          {" "}
                          <QuestionCircleOutlined /> what is activity level
                        </h1>
                      </Modal>
                    </Col>
                  );
                })}
              </Row>
            </h3>
          </div>
          <div>
            <h3>
              Time: <strong> 02:00 - 03:00</strong>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {ScreenShotData.map((data: any) => {
                  return (
                    <Col span={4}>
                      <div>
                        {list.map(() => (
                          <>
                            <img
                              src={IMAGE_SRC}
                              alt="no screenshot"
                              style={{
                                width: "100%",
                                height: "100px",
                                marginTop: "100px",
                              }}
                              onClick={() => setOpen(true)}
                            />
                            <Row gutter={[16, 16]}>
                              <Col>
                                <div>
                                  <Progress
                                    steps={10}
                                    strokeColor={[green[6], green[6], red[5]]}
                                    percent={data.porgress}
                                  />
                                </div>
                              </Col>

                              <Col>
                                <div>
                                  <span className={styles.reportTimer}>
                                    {data.time}
                                  </span>
                                </div>
                              </Col>
                            </Row>{" "}
                          </>
                        ))}
                      </div>
                      <Modal
                        title="Screenshot Detail"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                      >
                        <Row>
                          <Col span={8}>
                            {" "}
                            <h1>11:30 am</h1>
                          </Col>
                          <Col span={8} offset={8}>
                            <h3>
                              {" "}
                              <DeleteOutlined style={{ marginLeft: "200px" }} />
                              Remove
                            </h3>
                          </Col>
                        </Row>
                        <h3>Active Window</h3>
                        <h4>index.tsx visual studio code</h4>
                        <h2>Memo</h2>-<h2>Activity</h2>
                        <h4>Activity Level</h4>
                        <Row>
                          <Col span={8}>Active 6 of 10 am</Col>
                          <Col span={8} offset={8}>
                            <Progress
                              percent={60}
                              steps={5}
                              strokeColor={[green[6], green[6], red[5]]}
                              style={{ marginLeft: "200px" }}
                            />
                          </Col>
                        </Row>
                        <h1 onClick={info}>
                          {" "}
                          <QuestionCircleOutlined /> what is activity level
                        </h1>
                      </Modal>
                    </Col>
                  );
                })}
              </Row>
            </h3>
          </div>
          <div>
            <h3>
              Time: <strong> 03:00 - 04:00</strong>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {ScreenShotData.map((data: any) => {
                  return (
                    <Col span={4}>
                      <div>
                        {list.map(() => (
                          <>
                            <img
                              src={data.path}
                              alt="no screnshot"
                              style={{
                                width: "100%",
                                height: "100px",
                                marginTop: "100px",
                              }}
                              onClick={() => setOpen(true)}
                            />
                            <Row gutter={[16, 16]}>
                              <Col>
                                <div>
                                  <Progress
                                  
                                    steps={5}
                                    strokeColor={[green[6], green[6], red[5]]}
                                    percent={data.porgress}
                                  />
                                </div>
                              </Col>

                              <Col>
                                <div>
                                  <span className={styles.reportTimer}>
                                    {data.time}
                                  </span>
                                </div>
                              </Col>
                            </Row>{" "}
                          </>
                        ))}
                      </div>
                      <Modal
                        title="Screenshot Detail"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                      >
                        <Row>
                          <Col span={8}>
                            {" "}
                            <h1>11:30 am</h1>
                          </Col>
                          <Col span={8} offset={8}>
                            <h3>
                              {" "}
                              <DeleteOutlined style={{ marginLeft: "200px" }} />
                              Remove
                            </h3>
                          </Col>
                        </Row>
                        <h3>Active Window</h3>
                        <h4>index.tsx visual studio code</h4>
                        <h2>Memo</h2>-<h2>Activity</h2>
                        <h4>Activity Level</h4>
                        <Row>
                          <Col span={8}>Active 6 of 10 am</Col>
                          <Col span={8} offset={8}>
                            <Progress
                              percent={60}
                              steps={5}
                              strokeColor={[green[6], green[6], red[5]]}
                              style={{ marginLeft: "200px" }}
                            />
                          </Col>
                        </Row>
                        <h1 onClick={info}>
                          {" "}
                          <QuestionCircleOutlined /> what is activity level
                        </h1>
                      </Modal>
                    </Col>
                  );
                })}
              </Row>
            </h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ScreenShotSlider;
