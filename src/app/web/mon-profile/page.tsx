"use client";

import React, { useState } from 'react';
import { 
  Card, Container, Row, Col, Button, 
  Tab, Tabs, Image, ListGroup, Badge,
  Form, Modal, ProgressBar, Alert
} from 'react-bootstrap';
import { 
  FaEdit, FaHistory, FaStar,
  FaBox, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaShieldAlt, FaSignOutAlt, FaUserShield
} from 'react-icons/fa';
import avatarPlaceholder from '../assets/team.jpg';
import '../../styles/Global.css';
import { useAuth } from '@/services/AuthContext';

function MonProfil() {
  const { user, logout } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('infos');
  const [profileData, setProfileData] = useState({
    fullName: 'Jean Dupont',
    phone: '+237 6XX XXX XXX',
    address: 'Yaoundé, Cameroun',
    bio: 'Voyageur fréquent entre Douala et Paris. Je fais régulièrement des allers-retours avec de la place dans mes bagages.',
    verificationStatus: 'en_cours'
  });

  if (!user) return null;

  const inscriptionDate = new Date(user.metadata.creationTime).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Données factices pour démonstration
  const stats = {
    completedDeliveries: 12,
    rating: 4.8,
    kgTransported: 56,
    pendingTransactions: 2
  };

  const transactions = [
    { id: 1, date: '15/06/2023', destination: 'Paris', kg: 5, status: 'completed', amount: 25000 },
    { id: 2, date: '22/06/2023', destination: 'Bruxelles', kg: 3, status: 'in_progress', amount: 15000 },
    { id: 3, date: '05/07/2023', destination: 'Dakar', kg: 8, status: 'pending', amount: 40000 }
  ];

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowEditModal(false);
    // Ici vous ajouteriez la logique pour sauvegarder les modifications
  };

  return (
    <Container className="my-4 profile-container">
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm profile-card">
            <Card.Body className="text-center">
              <div className="position-relative d-inline-block">
                <Image 
                  src={user.photoURL || avatarPlaceholder} 
                  roundedCircle 
                  width={120}
                  height={120}
                  className="border border-4 border-primary mb-3"
                  alt="Photo de profil"
                />
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="rounded-circle position-absolute bottom-0 end-0"
                  onClick={() => setShowEditModal(true)}
                >
                  <FaEdit />
                </Button>
              </div>
              
              <h4 className="mb-1">{profileData.fullName}</h4>
              <p className="text-muted mb-3">{user.email}</p>
              
              {profileData.verificationStatus === 'verifie' && (
                <Badge bg="success" className="mb-3">
                  <FaUserShield className="me-1" /> Profil vérifié
                </Badge>
              )}
              {profileData.verificationStatus === 'en_cours' && (
                <Badge bg="warning" className="mb-3">
                  <FaShieldAlt className="me-1" /> Vérification en cours
                </Badge>
              )}

              <div className="d-flex justify-content-center gap-2 mb-4">
                <Button variant="outline-primary" size="sm">
                  <FaEnvelope className="me-1" /> Message
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <FaPhone className="me-1" /> Contacter
                </Button>
              </div>

              <ListGroup variant="flush" className="text-start">
                <ListGroup.Item>
                  <FaMapMarkerAlt className="text-muted me-2" />
                  {profileData.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaStar className="text-warning me-2" />
                  Note moyenne : {stats.rating}/5
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaBox className="text-primary me-2" />
                  {stats.completedDeliveries} transactions complétées
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaHistory className="text-info me-2" />
                  Membre depuis {inscriptionDate}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Button 
            variant="danger" 
            className="w-100 mt-3 d-flex align-items-center justify-content-center"
            onClick={logout}
          >
            <FaSignOutAlt className="me-2" /> Déconnexion
          </Button>
        </Col>

        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => { if (k) setActiveTab(k); }}
                className="mb-4"
              >
                <Tab eventKey="infos" title="Informations">
                  <h5 className="mb-3">À propos</h5>
                  <p>{profileData.bio}</p>
                  
                  <h5 className="mt-4 mb-3">Statistiques</h5>
                  <Row className="g-3">
                    <Col md={6}>
                      <Card className="stat-card">
                        <Card.Body>
                          <div className="d-flex align-items-center">
                            <div className="stat-icon bg-primary-light">
                              <FaBox />
                            </div>
                            <div className="ms-3">
                              <h6 className="mb-0">Kilos transportés</h6>
                              <span className="h4">{stats.kgTransported} kg</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="stat-card">
                        <Card.Body>
                          <div className="d-flex align-items-center">
                            <div className="stat-icon bg-success-light">
                              <FaStar />
                            </div>
                            <div className="ms-3">
                              <h6 className="mb-0">Note moyenne</h6>
                              <span className="h4">{stats.rating}/5</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {profileData.verificationStatus === 'en_cours' && (
                    <Alert variant="info" className="mt-4">
                      <FaShieldAlt className="me-2" />
                      Votre profil est en cours de vérification. Cette étape permet de renforcer la confiance dans notre communauté.
                      <ProgressBar animated now={65} label="65%" className="mt-2" />
                    </Alert>
                  )}
                </Tab>

                <Tab eventKey="transactions" title="Transactions">
                  <h5 className="mb-3">Historique des transactions</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Destination</th>
                          <th>Poids</th>
                          <th>Montant</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx) => (
                          <tr key={tx.id}>
                            <td>{tx.date}</td>
                            <td>{tx.destination}</td>
                            <td>{tx.kg} kg</td>
                            <td>{tx.amount.toLocaleString()} FCFA</td>
                            <td>
                              <Badge 
                                bg={
                                  tx.status === 'completed' ? 'success' : 
                                  tx.status === 'in_progress' ? 'warning' : 'secondary'
                                }
                              >
                                {tx.status === 'completed' ? 'Complété' : 
                                 tx.status === 'in_progress' ? 'En cours' : 'En attente'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab>

                <Tab eventKey="reviews" title="Avis (12)">
                  <div className="d-flex align-items-center mb-3">
                    <FaStar className="text-warning me-1" size={20} />
                    <span className="h4 mb-0 me-2">{stats.rating}</span>
                    <span className="text-muted">(12 avis)</span>
                  </div>

                  {[1, 2, 3].map((review) => (
                    <Card key={review} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>Client {review}</strong>
                            <div className="text-warning">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} size={14} className={i < 4 ? 'text-warning' : 'text-muted'} />
                              ))}
                            </div>
                          </div>
                          <small className="text-muted">15/06/2023</small>
                        </div>
                        <p className="mt-2 mb-0">Très bon service, colis arrivé en parfait état et avant la date prévue !</p>
                      </Card.Body>
                    </Card>
                  ))}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal d'édition du profil */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le profil</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveProfile}>
          <Modal.Body>
            <Form.Group className="mb-3 text-center">
              <Form.Label className="d-block">Photo de profil</Form.Label>
              <Image 
                src={user.photoURL || avatarPlaceholder} 
                roundedCircle 
                width={100}
                height={100}
                className="border border-3 border-primary mb-2"
              />
              <Form.Control type="file" accept="image/*" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control 
                type="text" 
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control 
                type="tel" 
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Adresse</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2}
                value={profileData.address}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              />
              <Form.Text className="text-muted">
                Décrivez vos habitudes de voyage ou vos besoins d'envoi.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default MonProfil;