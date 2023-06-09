import axios from "axios"


export const postOneToDeletedTodos = async (title: string) => {
    
   try {
    const response = await axios.post('http://localhost:8080/deletedTodos', {
      title,
      completed: true,
    });

    return response.data;
    
   } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error' };
   }


}