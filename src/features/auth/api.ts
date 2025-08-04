type User = {
  name: string;
  email: string;
};

// Функция получения пользователя 
export const getCurrentUser = async (): Promise<User> => {
  return {
    name: "Иван Иванов",
    email: "test@example.com",
  };
};

// Функция выхода 
export const performLogout = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    throw error;
  }
};