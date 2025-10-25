export interface User {
  name: string;
  email: string;
  avatar: string;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
      };
    };
  }
}

export const initGoogleAuth = (onSuccess: (user: User) => void) => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  
  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      callback: (response: any) => {
        const decoded = JSON.parse(atob(response.credential.split('.')[1]));
        const user: User = {
          name: decoded.name,
          email: decoded.email,
          avatar: decoded.picture,
        };
        onSuccess(user);
      },
    });
  };
  
  document.head.appendChild(script);
};

export const loginWithGoogle = () => {
  if (window.google) {
    window.google.accounts.id.prompt();
  }
};

export const logout = () => {
  localStorage.removeItem('teltube_user');
};

export const saveUser = (user: User) => {
  localStorage.setItem('teltube_user', JSON.stringify(user));
};

export const loadUser = (): User | null => {
  const stored = localStorage.getItem('teltube_user');
  return stored ? JSON.parse(stored) : null;
};
