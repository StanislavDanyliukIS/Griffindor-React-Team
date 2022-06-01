import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
    name: null,
    role: null,
    score: null,
    birthday: null,
    organization: null,
    telephone: null,
}

const crudSlice = createSlice({
    name:"crud",
    initialState,
    reducers:{
        createUser(state, action){
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.score = action.payload.score;
            state.birthday = action.payload.birthday;
            state.organization = action.payload.organization;
            state.telephone = action.payload.telephone;
        },
        updateUser(state, action){
            state.name = action.payload.name;
            state.score = action.payload.score;
            state.birthday = action.payload.birthday;
            state.organization = action.payload.organization;
            state.telephone = action.payload.telephone;
        },
        deleteUser(state, action){
            state.email= null;
            state.token= null;
            state.id= null;
            state.name= null;
            state.role= null;
            state.score= null;
            state.birthday= null;
            state.organization= null;
            state.telephone= null;
        }
    }
})

export const {createUser, updateUser, deleteUser} = crudSlice.actions;

export default crudSlice.reducer;