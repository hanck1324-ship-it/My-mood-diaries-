/**
 * 로그인 페이지
 * 
 * @route /auth/login
 */
export default function LoginPage() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1>로그인 페이지</h1>
      <p>회원가입이 완료되었습니다!</p>
      <p>로그인 기능은 추후 구현 예정입니다.</p>
      <a 
        href="/diaries" 
        style={{
          padding: '10px 20px',
          backgroundColor: '#4f46e5',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px'
        }}
      >
        일기 목록으로 이동
      </a>
    </div>
  );
}

