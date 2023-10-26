import { useState } from "react";
import {BsFillExclamationTriangleFill} from "react-icons/bs"
import {GrTransaction} from "react-icons/gr"
import "./Item1.css";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Item1 = () => {
  const navigate = useNavigate()
  const [searchItem, setSearchItem] = useState("")
  const [show, setShow] = useState(false)

  const handleSingleTransaction = () => {
    setShow(true)
    // navigate("/transaction/transact")
  }

  return (
    <>
    <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="card">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-lg-4 col-sm-6">
                    <div class="search-box mb-2 me-2">
                      <div class="position-relative">
                        <input
                          type="text"
                          class="form-control bg-light border-light rounded"
                          placeholder="Search..."
                          value={searchItem}
                          onChange={(e) => setSearchItem(e.target.value)}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          class="eva eva-search-outline search-icon"
                        >
                          <g data-name="Layer 2">
                            <g data-name="search">
                              <rect width="24" height="24" opacity="0"></rect>
                              <path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8 col-sm-6">
                    <div class="mt-4 mt-sm-0 d-flex align-items-center justify-content-sm-end">
                      <div class="mb-2 me-2">
                        <div class="dropdown">
                          <button
                            class="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="mdi mdi-plus me-1"></i> Create New
                          </button>
                          <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#">
                              <i class="mdi mdi-folder-outline me-1"></i> Folder
                            </a>
                            <a class="dropdown-item" href="#">
                              <i class="mdi mdi-file-outline me-1"></i> File
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="dropdown mb-0">
                        <a
                          class="btn btn-link text-muted dropdown-toggle p-1 mt-n2"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                        >
                          <i class="mdi mdi-dots-vertical font-size-20"></i>
                        </a>

                        <div class="dropdown-menu dropdown-menu-end">
                          <a class="dropdown-item" href="#">
                            Share Files
                          </a>
                          <a class="dropdown-item" href="#">
                            Share with me
                          </a>
                          <a class="dropdown-item" href="#">
                            Other Actions
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 class="font-size-16 me-3 mb-0">My Files</h5>
                <div class="row mt-4 justify-content-between align-items-center">
                  <div class="col-xl-6 col-sm-6">
                    <div class="card shadow-none border">
                      <div class="card-body p-3">
                        <div class="">
                          <div class="dropdown float-end">
                            {/* <a
                              class="text-muted dropdown-toggle font-size-16"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i class="bx bx-dots-vertical-rounded font-size-20"></i>
                            </a> */}
                            {/* <div class="dropdown-menu dropdown-menu-end">
                              <a class="dropdown-item" href="#">
                                Edit
                              </a>
                              <a class="dropdown-item" href="#">
                                Action
                              </a>
                              <a class="dropdown-item" href="#">
                                Remove
                              </a>
                            </div> */}
                            <h1>100</h1>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="avatar align-self-center me-3">
                              <div class="avatar-title rounded bg-soft-primary text-primary font-size-24">
                                {/* <i class="mdi mdi-google-drive"></i> */}
                                <GrTransaction />
                              </div>
                            </div>

                            <div class="flex-1">
                              <h5 class="font-size-15 mb-1">All <br /> Transactions</h5>
                              {/* <a href="" class="font-size-13 text-muted">
                                <u>View Folder</u>
                              </a> */}
                            </div>
                          </div>
                          <div className="mt-3 pt-1">
                            <button className="btn btn-primary">View More</button>
                          </div>
                          {/* <div class="mt-3 pt-1">
                            <div class="d-flex justify-content-between">
                              <p class="text-muted font-size-13 mb-1">20GB</p>
                              <p class="text-muted font-size-13 mb-1">
                                50GB used
                              </p>
                            </div>
                            <div class="progress animated-progess custom-progress">
                              <div
                                class="progress-bar bg-gradient bg-primary"
                                role="progressbar"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div class="col-xl-4 col-sm-6">
                    <div class="card shadow-none border">
                      <div class="card-body p-3">
                        <div class="">
                          <div class="dropdown float-end">
                            <a
                              class="text-muted dropdown-toggle font-size-16"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i class="bx bx-dots-vertical-rounded font-size-20"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                              <a class="dropdown-item" href="#">
                                Edit
                              </a>
                              <a class="dropdown-item" href="#">
                                Action
                              </a>
                              <a class="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="avatar align-self-center me-3">
                              <div class="avatar-title rounded bg-soft-info text-info font-size-24">
                                <i class="mdi mdi-dropbox"></i>
                              </div>
                            </div>

                            <div class="flex-1">
                              <h5 class="font-size-15 mb-1">Dropbox</h5>
                              <a href="" class="font-size-13 text-muted">
                                <u>View Folder</u>
                              </a>
                            </div>
                          </div>
                          <div class="mt-3 pt-1">
                            <div class="d-flex justify-content-between">
                              <p class="text-muted font-size-13 mb-1">20GB</p>
                              <p class="text-muted font-size-13 mb-1">
                                50GB used
                              </p>
                            </div>
                            <div class="progress animated-progess custom-progress">
                              <div
                                class="progress-bar bg-gradient bg-info"
                                role="progressbar"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div class="col-xl-6 col-sm-6">
                    <div class="card shadow-none border">
                      <div class="card-body p-3">
                        <div class="">
                          <div class="dropdown float-end">
                            <h1>20</h1>
                            {/* <a
                              class="text-muted dropdown-toggle font-size-16"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i class="bx bx-dots-vertical-rounded font-size-20"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                              <a class="dropdown-item" href="#">
                                Edit
                              </a>
                              <a class="dropdown-item" href="#">
                                Action
                              </a>
                              <a class="dropdown-item" href="#">
                                Remove
                              </a>
                            </div> */}
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="avatar align-self-center me-3">
                              <div class="avatar-title rounded bg-soft-danger text-danger font-size-24">
                                {/* <i class="mdi mdi-apple-icloud"></i> */}
                                <BsFillExclamationTriangleFill color="red"/>
                              </div>
                            </div>

                            <div class="flex-1">
                              <h5 class="font-size-15 mb-1">Flagged <br /> Transaction</h5>
                              {/* <a href="" class="font-size-13 text-muted">
                                <u>View Folder</u>
                              </a> */}
                            </div>
                          </div>
                          <div className="mt-3 pt-1">
                            <button className="btn btn-primary">View More</button>
                          </div>
                          {/* <div class="mt-3 pt-1">
                            <div class="d-flex justify-content-between">
                              <p class="text-muted font-size-13 mb-1">20GB</p>
                              <p class="text-muted font-size-13 mb-1">
                                50GB used
                              </p>
                            </div>
                            <div class="progress animated-progess custom-progress">
                              <div
                                class="progress-bar bg-gradient bg-primary"
                                role="progressbar"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-wrap">
                  <h5 class="font-size-16 me-3">Recent Files</h5>
                  <div class="ms-auto">
                    <a href="javascript: void(0);" class="fw-medium text-reset">
                      View All
                    </a>
                  </div>
                </div>
                <hr class="mt-2" />
                <div class="table-responsive">
                  <table class="table align-middle table-nowrap table-hover mb-0">
                    <thead class="table-light">
                      <tr>
                        <th scope="col">Transaction Id</th>
                        <th scope="col">Account Number</th>
                        <th scope="col">Transaction Amount</th>
                        <th scope="col">Account Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Account Balance</th>
                        <th scope="col">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr onClick={handleSingleTransaction}>
                        <td>
                          <a
                            href="javascript: void(0);"
                            class="text-dark fw-medium"
                          >
                            <i class="mdi mdi-file-document font-size-16 align-middle text-primary me-2"></i>{" "}
                            index.html
                          </a>
                        </td>
                        <td>12-10-2020, 09:45</td>
                        <td>09 KB</td>
                        <td>
                          {/* <div class="avatar-group">
                            <div class="avatar-group-item">
                              <a
                                href="javascript: void(0);"
                                class="d-inline-block"
                              >
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                  alt=""
                                  class="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div class="avatar-group-item">
                              <a
                                href="javascript: void(0);"
                                class="d-inline-block"
                              >
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                  alt=""
                                  class="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div class="avatar-group-item">
                              <a
                                href="javascript: void(0);"
                                class="d-inline-block"
                              >
                                <div class="avatar-sm">
                                  <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                    A
                                  </span>
                                </div>
                              </a>
                            </div>
                          </div> */}
                          image
                        </td>
                        <td>
                          {/* <div class="dropdown">
                            <a
                              class="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i class="mdi mdi-dots-horizontal"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-end">
                              <a class="dropdown-item" href="#">
                                Open
                              </a>
                              <a class="dropdown-item" href="#">
                                Edit
                              </a>
                              <a class="dropdown-item" href="#">
                                Rename
                              </a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div> */}
                          done
                        </td>
                        <td>
                            done
                        </td>
                        <td>
                            done
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a
                            href="javascript: void(0);"
                            class="text-dark fw-medium"
                          >
                            <i class="mdi mdi-folder-zip font-size-16 align-middle text-warning me-2"></i>{" "}
                            Project-A.zip
                          </a>
                        </td>
                        <td>11-10-2020, 17:05</td>
                        <td>115 KB</td>
                        <td>
                          <div class="avatar-group">
                            <div class="avatar-group-item">
                              <a
                                href="javascript: void(0);"
                                class="d-inline-block"
                              >
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                  alt=""
                                  class="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div class="avatar-group-item">
                              <a
                                href="javascript: void(0);"
                                class="d-inline-block"
                              >
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                  alt=""
                                  class="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="dropdown">
                            <a
                              class="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i class="mdi mdi-dots-horizontal"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-end">
                              <a class="dropdown-item" href="#">
                                Open
                              </a>
                              <a class="dropdown-item" href="#">
                                Edit
                              </a>
                              <a class="dropdown-item" href="#">
                                Rename
                              </a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <strong>
                Transaction ID:
              </strong>
            </div>
            <div>
              <strong>
                Sender ID:
              </strong>
            </div>
            <div>
              <strong>
                Sender Account Number:
              </strong>
            </div>
            <div>
              <strong>
                Sender Risk Factor:
              </strong>
            </div>
            <div>
              <strong>
                Recipient Account Number:
              </strong>
            </div>
            <div>
              <strong>
                Recipient Bank:
              </strong>
            </div>
            <div>
              <strong>
                Recipient Risk Factor:
              </strong>
            </div>
            <div>
              <strong>
                Recipient Account Type:
              </strong>
            </div>
            <div>
              <strong>
                Transaction Type:
              </strong>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
      

  );
};

export default Item1;
