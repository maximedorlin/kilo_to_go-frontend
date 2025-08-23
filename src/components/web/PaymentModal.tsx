import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

interface PaymentModalProps {
  show: boolean;
  handleClose: () => void;
}

const PaymentModal = ({ show, handleClose }: PaymentModalProps) => {
  const [moyen, setMoyen] = useState('');
  const [numero, setNumero] = useState('');
  const [montant, setMontant] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!moyen || !numero || !montant) {
      return;
    }

    // Simulation de paiement et génération d'un code
    const codeValidation = Math.floor(100000 + Math.random() * 900000); // 6 chiffres
    console.log("Code à envoyer à l'acheteur :", codeValidation);

    setSubmitted(true);
    // TODO: Enregistrer paiement en base + statut = "en attente"
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Paiement sécurisé</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitted ? (
          <Alert variant="success">
            Paiement en attente. Un code de validation a été envoyé à votre téléphone.
          </Alert>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Moyen de paiement</Form.Label>
              <Form.Select value={moyen} onChange={(e) => setMoyen(e.target.value)}>
                <option value="">Choisir un moyen</option>
                <option value="orange">Orange Money</option>
                <option value="mtn">MTN Money</option>
                <option value="bank">Banque</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Numéro du vendeur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: 690000000"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Montant à payer (FCFA)</Form.Label>
              <Form.Control
                type="number"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!submitted && (
          <Button variant="primary" onClick={handleSubmit}>
            Confirmer et payer
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
