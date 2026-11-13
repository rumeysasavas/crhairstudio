'use client';

import { ModalShell } from './authUi';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

// view: 'login' | 'register' | 'forgot'
export default function AuthModal({ view, onViewChange, onClose }) {
  const handleClose = view === 'forgot' ? () => onViewChange('login') : onClose;

  return (
    <ModalShell onClose={handleClose}>
      {view === 'login' && <LoginForm onSuccess={onClose} onSwitch={onViewChange} />}
      {view === 'register' && <RegisterForm onSuccess={onClose} onSwitch={onViewChange} />}
      {view === 'forgot' && <ForgotPasswordForm onSwitch={onViewChange} />}
    </ModalShell>
  );
}
