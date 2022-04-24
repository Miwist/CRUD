import React, {useState} from 'react';
import './App.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import CustomTable from '../CustomTable/CustomTable';


const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: ''
}

function App() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null
  })
 
console.log('userData ', userData)

  const handleRemoveClick = ({ index }) => {
      setUsers(users.filter((user, userIndex) => userIndex !== index));
  } 

  const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;
  
  const handleSubmitUser = (e) => {
      e.preventDefault();
      
      if (isFilledFields) {
        if (editableUserData.isEdit) {
          const editedData = users;
          editedData.splice(editableUserData.userIndex, 1, userData)

          setUsers(editedData);

          setEditableUserData({
            isEdit: false,
            userIndex: null
            })
        } else {

          setUsers((prevState) => [...prevState, userData]);
        }

        setUserData(initialValues)
      }    
}

  const handleCleanClick = () => setUserData(initialValues);

  const handleEditClick = ({user, index}) => {
    setUserData(user);
    setEditableUserData({
      isEdit: true,
      userIndex: index
      })
  }

 const handleInputChange = (e, userName) => setUserData((prevState) => ({
  ...prevState,
  [userName]: e.target.value
}))

  return (
    <div className="wrapper">
     <div className="wrapper-content"> 
       <div className="table-data">
         <CustomTable
          users={users}
          handleEditClick={handleEditClick}
          handleRemoveClick={handleRemoveClick}
         />
       </div>

       <form onSubmit={handleSubmitUser} onReset={handleCleanClick}> 
       <CustomInput
       placeholder="Write your name"
       handleChange={handleInputChange}
       value={userData.userName}
        fieldName='userName'
         />
          <CustomInput
       placeholder="Write your name"
       handleChange={handleInputChange}
       value={userData.userSurname}
        fieldName='userSurname'
         />
          <CustomInput
       placeholder="Write your name"
       handleChange={handleInputChange}
       value={userData.userSalary}
        fieldName='userSalary'
         />

        <div className="buttons-wrapper">
        <CustomButton 
                label="Clean"
                classNames=""
                handleClick={() => { }}
                data={null}
                type="reset"
              />
        <CustomButton 
                label={editableUserData.isEdit ? 'Edit' : 'Add'}
                classNames=""
                handleClick={() => { }}
                data={null}
                type="submit"
              />
        </div>
       </form>
     </div>
    </div>
  );
}

export default App;
