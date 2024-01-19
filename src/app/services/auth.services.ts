const apiUrl = "http://23.97.147.233:5001";

export const getOneUser = async (id: number) => {
    const token = localStorage.getItem('token');
    return await fetch(`${apiUrl}/api/users/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
}
  
