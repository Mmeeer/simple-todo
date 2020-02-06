export default function ({ store, redirect }) {
  if(store.state._id != null && store.state.token != null) {
    return redirect('/')
  }
}
