import { Quote } from "../components/Quote"

export const Signup = () => {
  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">Signup Page</h1>
          <p className="mt-2">Please fill out the form to create an account.</p>
        </div>
        <Quote/>
      </div>
      
      <Quote/>
    </div>
  )
}