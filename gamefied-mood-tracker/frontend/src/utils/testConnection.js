// frontend/src/utils/testConnection.js
// Run this in your browser console to test the connection

export const testBackendConnection = async () => {
  console.log('=== Testing Backend Connection ===\n');
  
  try {
    // Test 1: Direct backend connection
    console.log('Test 1: Direct Backend Connection');
    const directResponse = await fetch('http://localhost:5000/api/health');
    const directData = await directResponse.json();
    console.log('✅ Direct connection successful:', directData);
    console.log('');
  } catch (error) {
    console.error('❌ Direct connection failed:', error.message);
    console.log('');
  }
  
  try {
    // Test 2: Proxied connection
    console.log('Test 2: Proxied Connection (through Vite)');
    const proxiedResponse = await fetch('/api/health');
    const proxiedData = await proxiedResponse.json();
    console.log('✅ Proxied connection successful:', proxiedData);
    console.log('');
  } catch (error) {
    console.error('❌ Proxied connection failed:', error.message);
    console.log('');
  }
  
  try {
    // Test 3: CORS headers
    console.log('Test 3: CORS Configuration');
    const corsResponse = await fetch('http://localhost:5000/api/health', {
      credentials: 'include'
    });
    console.log('✅ CORS configured correctly');
    console.log('Response headers:', Object.fromEntries(corsResponse.headers));
    console.log('');
  } catch (error) {
    console.error('❌ CORS configuration issue:', error.message);
    console.log('');
  }
  
  console.log('=== Connection Test Complete ===');
};

// Auto-run in development
if (import.meta.env.DEV) {
  // Uncomment to auto-test on app load
  // testBackendConnection();
}

export default testBackendConnection;

// ============================================
// HOW TO USE:
// ============================================
// 1. Import in your App.jsx or Dashboard.jsx:
//    import testBackendConnection from './utils/testConnection';
//
// 2. Call it in useEffect:
//    useEffect(() => {
//      testBackendConnection();
//    }, []);
//
// 3. Or run directly in browser console:
//    window.testConnection = testBackendConnection;
//    testConnection();
// ============================================