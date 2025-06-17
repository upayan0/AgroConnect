import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Navigation } from "./components/layout/Navigation";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { BuyerDashboard } from "./pages/dashboards/BuyerDashboard";
import { FarmerDashboard } from "./pages/dashboards/FarmerDashboard";
import { Learning } from "./pages/learning/Learning";
import { CropMarketplace } from "./pages/marketplace/CropMarketplace";
import { InputsMarketplace } from "./pages/marketplace/InputsMarketplace";
import { ProductDetail } from "./pages/marketplace/ProductDetail";
import { Cart } from "./pages/cart/Cart";
import { Checkout } from "./pages/cart/Checkout";
import { OrderSuccess } from "./pages/cart/OrderSuccess";
import { Advisory } from "./pages/advisory/Advisory";
import { AdvisoryDetail } from "./pages/advisory/AdvisoryDetail";
import { Profile } from "./pages/Profile";
import { ChatBot } from "./components/chat/ChatBot";
import { FAQs } from "./pages/FAQs";
import NotFound from "./pages/NotFound";
import { Weather } from "./pages/weather/Weather";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <main className="pt-16">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/crop-marketplace" element={<CropMarketplace />} />
                    <Route path="/inputs-marketplace" element={<InputsMarketplace />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/advisory" element={<Advisory />} />
                    <Route path="/advisory/:diseaseId" element={<AdvisoryDetail />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/weather" element={<Weather />} />
                    
                    {/* Protected Routes */}
                    <Route path="/buyer-dashboard" element={
                      <ProtectedRoute allowedRoles={['buyer']}>
                        <BuyerDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/farmer-dashboard" element={
                      <ProtectedRoute allowedRoles={['farmer']}>
                        <FarmerDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/learning" element={
                      <ProtectedRoute allowedRoles={['farmer']}>
                        <Learning />
                      </ProtectedRoute>
                    } />
                    <Route path="/cart" element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    } />
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    <Route path="/order-success" element={
                      <ProtectedRoute>
                        <OrderSuccess />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <ChatBot />
                <Toaster />
                <Sonner />
              </div>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
