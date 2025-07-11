import supabase, { supabaseUrl } from './supabase'

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw new Error(error.message)
  return data
}
//wiil be used to fetch user data in context api
export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}

export async function signup({ name, email, password, avatars }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatars);

  if (storageError) throw new Error(storageError.message)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatars: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
      }
    }
  })
  if (error) throw new Error(error.message);
  return data;
}
export async function logout() {
  const{error} = await supabase.auth.signOut()
  if (error) throw new Error(error.message);
  
}