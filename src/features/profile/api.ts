export const uploadAvatar = async (file: File): Promise<{ url: string }> => {
  // Заглушка - в реальном приложении здесь будет:
  // 1. FormData создание
  // 2. Fetch запрос к вашему API
  // 3. Обработка ответа
  
  console.log('Файл для загрузки:', file.name);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ 
        url: URL.createObjectURL(file) // Временный URL, в реальности будет с сервера
      });
    }, 1000);
  });
};