import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import login from '../assets/images/login.png'
import LoginForm from '../components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { getState, setStatusToIdle } from '../redux/slices/authSlice'
import Spinner from '../components/spinner'


function Login() {

  let navigate = useNavigate()

  const handleClick = () => navigate('/security/register');

  const {status, message} = useSelector(getState)

  const dispatch = useDispatch()

  useEffect(() => {
    if (['success', 'failed'].includes(status)) {
      setTimeout(() => {
        dispatch(setStatusToIdle())
      }, 4000);
    }
    
  }, [status]);


  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-gradient-to-br from-orange-300/30 to-amber-300/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-15%] left-[30%] w-96 h-96 bg-gradient-to-br from-amber-300/30 to-yellow-300/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen md:mx-3 md:p-4 py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card container with glass effect */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-orange-100/50 transform transition-all duration-500 hover:shadow-orange-200/50 hover:scale-[1.02]">
            
            {/* Header section */}
            <div className="flex flex-col justify-center items-center text-center mb-8">
              {/* Logo container with hover effect */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-orange-100 to-amber-100 p-4 rounded-full transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <img 
                    src={login} 
                    alt="Logo" 
                    width="80" 
                    height="80" 
                    className="align-text-top drop-shadow-lg" 
                  />
                </div>
              </div>
              
              {/* Title with gradient */}
              <h4 className="mt-6 pb-1 text-2xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Authentification
              </h4>
              
              <p className="text-gray-600 text-sm mt-2">
                Gérez vos tâches efficacement
              </p>
            </div>

            {/* Error message with animation */}
            {(status === 'failed' && message) && (
              <div className="mb-6 animate-shake">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{message}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Spinner */}
            {(status === 'loading') && <Spinner />}

            {/* Login Form */}
            <LoginForm />

            {/* Additional link section */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Pas encore de compte ?{' '}
                <button 
                  onClick={handleClick}
                  className="font-semibold text-orange-600 hover:text-amber-600 transition-colors duration-200 underline decoration-2 decoration-orange-300 hover:decoration-amber-400 underline-offset-2"
                >
                  Créer un compte
                </button>
              </p>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center mt-6 text-gray-500 text-sm">
            Votre productivité commence ici ✨
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}


export default Login