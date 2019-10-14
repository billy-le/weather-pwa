import React from 'react';
import styled from '@emotion/styled';

const StyledHeader = styled.header`
  height: 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-contents: space-between;
  padding: 12px 40px;
  margin: 0 auto;
`;

const Brand = styled.h1`
  color: #583;
  flex-grow: 2;
`;

const Nav = styled.nav`
  flex-grow: 1;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
`;

const NavItem = styled.li``

const navItems: string[] = ['Search', 'About']

export const Header: React.FC = (): JSX.Element => (
  <StyledHeader>
    <Container>
      <Brand>Sky Scanner</Brand>
      <Nav>
        <NavList>
          {navItems.map((item, i) => (
            <NavItem key={i}>{item}</NavItem>
          ))}
        </NavList>
      </Nav>
    </Container>
  </StyledHeader>
)
