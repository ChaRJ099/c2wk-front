const apiUrl = "http://20.119.34.167:5001";

export const getOneUser = async (id: number) => {
    const token = localStorage.getItem('token');
    return await fetch(`${apiUrl}/api/users/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
}
  
