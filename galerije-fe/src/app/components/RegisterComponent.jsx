import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function RegisterComponent({
  handleOnRegister,
  newUser,
  setNewUser,
}) {
  return (
  <div>
      <Form onSubmit={handleOnRegister} className="px-4 my-5" >
          <Form.Label>First Name: </Form.Label>
          <Col sm={4}>
          <Form.Control
              placeholder="First name"
              required
              type="text"
              value={newUser.first_name}
              onChange={({ target }) =>
              setNewUser({ ...newUser, first_name: target.value })}
          />
          </Col>

          <Form.Label>Last Name: </Form.Label>
          <Col sm={4}>
          <Form.Control
              placeholder="Last name"
              required
              type="text"
              value={newUser.last_name}
              onChange={({ target }) =>
              setNewUser({ ...newUser, last_name: target.value })}
          />
          </Col>

          <Form.Label>Email address: </Form.Label>
          <Col sm={4}>
          <Form.Control
              type="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={({ target }) =>
              setNewUser({ ...newUser, email: target.value })}
          />
          </Col>

          <Form.Label>Password: </Form.Label>
          <Col sm={4}>
          <Form.Control
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={({ target }) =>
              setNewUser({ ...newUser, password: target.value })}
          />
          </Col>

          <Form.Label>Confirm Password: </Form.Label>
          <Col sm={4}>
          <Form.Control
              required
              type="password"
              value={newUser.confirmed_password}
              onChange={({ target }) =>
              setNewUser({ ...newUser, confirmed_password: target.value })}
          />
          </Col>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I accept terms and conditions"
              required
              name="terms"
              value={true}
              onChange={({ target }) => setNewUser({ ...newUser, terms: target.checked })}
          />
          </Form.Group>

          <Button variant="outline-dark" type="submit">Register</Button>
      </Form>
  </div>
  );
//   return (
//     <form onSubmit={handleOnRegister}>
//       <div class="form-row">
//         <div class="form-group col-md-3">
//           <input
//             type="text"
//             class="form-control"
//             placeholder="First name"
//             required
//             value={newUser.first_name}
//             onChange={({ target }) =>
//               setNewUser({ ...newUser, first_name: target.value })
//             }
//           />
//         </div>
//         <div class="form-group col-md-3">
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Last name"
//             required
//             value={newUser.last_name}
//             onChange={({ target }) =>
//               setNewUser({ ...newUser, last_name: target.value })
//             }
//           />
//           <div class="form-group col-md-12">
//             <input
//               class="form-control"
//               type="email"
//               placeholder="Email"
//               required
//               value={newUser.email}
//               onChange={({ target }) =>
//                 setNewUser({ ...newUser, email: target.value })
//               }
//             />
//           </div>
//           <div class="form-group col-md-12">
//             <input
//               class="form-control"
//               type="password"
//               placeholder="Password"
//               required
//               value={newUser.password}
//               onChange={({ target }) =>
//                 setNewUser({ ...newUser, password: target.value })
//               }
//             />
//           </div>
//           <div class="form-group col-md-12">
//             <input
//               class="form-control"
//               type="password"
//               placeholder="Confirm password"
//               required
//               value={newUser.confirmed_password}
//               onChange={({ target }) =>
//                 setNewUser({ ...newUser, confirmed_password: target.value })
//               }
//             />
//           </div>
//           <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Check type="checkbox" label="I accept terms and conditions"
//               required
//               name="terms"
//               value={true}
//               onChange={({ target }) => setNewUser({ ...newUser, terms: target.checked })}
//           />
//           </Form.Group>
//           <Button variant="outline-success" type="submit">
//             Register
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
}
