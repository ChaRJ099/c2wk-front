const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getOneUser = async (id: number) => {
    const token = localStorage.getItem('token');
    return await fetch(`${apiUrl}/api/users/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
}
  
