import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {about} from '../modules/message';
export default () => (
    <Container>
      <Row className="mt-3">
        <Col>
          <Link to="/">← Back</Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <h3>{about.About}</h3>
        <p>{about.aboutSection} <a target="_blank" href="https://blockstack.org">{about.blockstack}</a> {about.platform}.
        </p>
      </Row>
    </Container>
)
