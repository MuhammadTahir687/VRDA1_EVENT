
const config ={
  screens:{
      Signin:{
          path:"signin/:id",
          parse:{
              id:(id)=>`${id}`,
          }
      }
  }
}
const linking ={
  prefixes:["event://"],
    config,
};
export default linking
