import { Modal, Button } from "react-bootstrap";

export default function AppModal({isOpen, onToggle}) {
  return (
    <Modal show={isOpen} hide={onToggle}>
      <Modal.Header toggle={onToggle}>Modal title</Modal.Header>
      <Modal.Body>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={onToggle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
