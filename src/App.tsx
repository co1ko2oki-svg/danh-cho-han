import { useState, useEffect, useCallback } from 'react'
import './index.css'
import han1 from './assets/han1.webp'
import han2 from './assets/han2.webp'
import han3 from './assets/han3.webp'

// ==========================================
// MẬT KHẨU IPHONE (6 SỐ): 080611
// ==========================================
const TARGET_PASSCODE = '080611'
const PASSCODE_LENGTH = 6

const DEFAULT_PHOTOS = [
  { 
    url: han1, 
    fallbackUrl: 'https://media.discordapp.net/attachments/1529821512385691850/1545775424783777843/att.PGD22TjXXQvQyx9bG8uCmulbU9T3_sV6kMzcn53jZpg.jpg?ex=6a9d5f0c&is=6a9c0d8c&hm=566dad886f5a8d45f3eb59ee8c3b74b0e86a763fe4f04872cafd50dba9a8d461&=&format=webp&width=768&height=1024',
    caption: 'Nụ cười rạng rỡ của Hân 🌸' 
  },
  { 
    url: han2, 
    fallbackUrl: 'https://media.discordapp.net/attachments/1529821512385691850/1545775425123524638/att.81O4AWP-_QwrI7ZPBHL1pC_y5ImQhKF-M2B-ElhPj7k.jpg?ex=6a9d5f0c&is=6a9c0d8c&hm=68dd7fa63268c8785ea5c4e0199fc70d9e8a0bac5d857c15d1d1a58e7420108c&=&format=webp',
    caption: 'Khoảnh khắc ngọt ngào và đáng yêu ✨' 
  },
  { 
    url: han3, 
    fallbackUrl: 'https://media.discordapp.net/attachments/1529821512385691850/1545775425458806818/att.-8JB9mRWnPEbwRYei9-Hyc_WWIPu1_28yDx0nvY2xlM.jpg?ex=6a9d5f0c&is=6a9c0d8c&hm=152d32b3b01ebaf4d2b284aecb5c882eccac51125b4daae056dc3421a3ad2f30&=&format=webp',
    caption: 'Mỗi khoảnh khắc bên Hân đều là bình yên 💕' 
  }
]

interface HeartProps {
  id: string
  symbol: string
  left: number
  top?: number
  duration: number
  delay: number
  size: number
  isTap?: boolean
  onComplete: (id: string) => void
}

function FloatingHeart({ id, symbol, left, top, duration, delay, size, isTap, onComplete }: HeartProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id)
    }, (duration + delay) * 1000)
    return () => clearTimeout(timer)
  }, [id, duration, delay, onComplete])

  return (
    <div
      className={`floating-heart ${isTap ? 'tap-heart' : ''}`}
      style={{
        left: `${left}px`,
        top: top !== undefined ? `${top}px` : undefined,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        fontSize: `${size}px`,
      }}
    >
      {symbol}
    </div>
  )
}

function playKeyClick() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.035)
  } catch {
    // silently fail
  }
}

function playSweetChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    
    const notes = [523.25, 659.25, 783.99, 1046.50]
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08)
      
      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.08)
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + index * 0.08 + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 1.2)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start(ctx.currentTime + index * 0.08)
      osc.stop(ctx.currentTime + index * 0.08 + 1.2)
    })
  } catch {
    // silently fail
  }
}

function playUnlockSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    
    const notes = [440, 554.37, 659.25, 880]
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1)
      
      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.1)
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + index * 0.1 + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.1 + 0.8)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start(ctx.currentTime + index * 0.1)
      osc.stop(ctx.currentTime + index * 0.1 + 0.8)
    })
  } catch {
    // silently fail
  }
}

const KEYPAD_BUTTONS = [
  { num: '1', letters: '' },
  { num: '2', letters: 'A B C' },
  { num: '3', letters: 'D E F' },
  { num: '4', letters: 'G H I' },
  { num: '5', letters: 'J K L' },
  { num: '6', letters: 'M N O' },
  { num: '7', letters: 'P Q R S' },
  { num: '8', letters: 'T U V' },
  { num: '9', letters: 'W X Y Z' },
]

function App() {
  // Passcode states
  const [passcode, setPasscode] = useState<string>('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [showHint, setShowHint] = useState(false)

  // Photo gallery
  const photos = DEFAULT_PHOTOS
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0)
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null)

  // Card states
  const [isOpen, setIsOpen] = useState(false)
  const [showFront, setShowFront] = useState(true)
  const [hearts, setHearts] = useState<HeartProps[]>([])

  const heartSymbols = ['❤️', '✨', '💖', '🌸', '💐', '💕']

  const removeHeart = useCallback((id: string) => {
    setHearts(prev => prev.filter(h => h.id !== id))
  }, [])

  const createAmbientHeart = useCallback((): HeartProps => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 400
    return {
      id: Math.random().toString(36).substring(2, 9),
      symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
      left: Math.random() * screenWidth,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 1.5,
      size: 14 + Math.random() * 22,
      onComplete: removeHeart,
    }
  }, [removeHeart])

  // Tap anywhere on screen to spawn floating heart
  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    let clientX = 0
    let clientY = 0
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if ('clientX' in e) {
      clientX = e.clientX
      clientY = e.clientY
    }

    if (clientX === 0 && clientY === 0) return

    const tapHeart: HeartProps = {
      id: Math.random().toString(36).substring(2, 9),
      symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
      left: clientX - 12,
      top: clientY - 12,
      duration: 2.2,
      delay: 0,
      size: 24 + Math.random() * 14,
      isTap: true,
      onComplete: removeHeart,
    }

    setHearts(prev => [...prev.slice(-40), tapHeart])
  }

  useEffect(() => {
    const initial = Array.from({ length: 12 }, createAmbientHeart)
    setHearts(initial)

    const interval = setInterval(() => {
      setHearts(prev => {
        if (prev.length > 35) return prev
        return [...prev, createAmbientHeart()]
      })
    }, 700)

    return () => clearInterval(interval)
  }, [createAmbientHeart])

  // Process passcode verification
  const handleAddDigit = useCallback((digit: string) => {
    if (isUnlocked || isShaking) return
    playKeyClick()

    setPasscode(prev => {
      if (prev.length >= PASSCODE_LENGTH) return prev
      const newCode = prev + digit

      if (newCode.length === PASSCODE_LENGTH) {
        if (newCode === TARGET_PASSCODE) {
          playUnlockSound()
          setErrorText('')
          
          const burst = Array.from({ length: 20 }, createAmbientHeart)
          setHearts(h => [...h, ...burst])

          setTimeout(() => {
            setIsUnlocked(true)
          }, 300)
        } else {
          setErrorText('Mật mã không đúng')
          setIsShaking(true)
          setTimeout(() => {
            setPasscode('')
            setIsShaking(false)
          }, 600)
        }
      }

      return newCode
    })
  }, [isUnlocked, isShaking, createAmbientHeart])

  const handleDeleteDigit = useCallback(() => {
    if (isUnlocked || isShaking) return
    playKeyClick()
    setPasscode(prev => prev.slice(0, -1))
    setErrorText('')
  }, [isUnlocked, isShaking])

  // Support physical keyboard
  useEffect(() => {
    if (isUnlocked) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleAddDigit(e.key)
      } else if (e.key === 'Backspace') {
        handleDeleteDigit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isUnlocked, handleAddDigit, handleDeleteDigit])

  // Photo handlers
  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentPhotoIdx(prev => (prev + 1) % photos.length)
  }

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentPhotoIdx(prev => (prev - 1 + photos.length) % photos.length)
  }

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSweetChime()
    setIsOpen(true)

    const burst = Array.from({ length: 14 }, createAmbientHeart)
    setHearts(prev => [...prev, ...burst])

    setTimeout(() => {
      setShowFront(false)
    }, 450)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFront(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 50)
  }

  const activePhoto = photos[currentPhotoIdx] || DEFAULT_PHOTOS[0]

  return (
    <div className="app-wrapper" onClick={handleScreenTap} onTouchStart={handleScreenTap}>
      <div className="background-container">
        {hearts.map(h => (
          <FloatingHeart key={h.id} {...h} />
        ))}
      </div>

      {!isUnlocked ? (
        /* IPHONE PASSCODE LOCK SCREEN */
        <main className="ios-lock-screen" onClick={e => e.stopPropagation()}>
          <div className="ios-lock-header">
            <div className="ios-lock-icon">🔒</div>
            <h2 className="ios-passcode-title">Nhập mật mã</h2>
            <p className="ios-passcode-sub">Dành riêng cho Hân ✨</p>
          </div>

          <div className={`ios-dots-container ${isShaking ? 'ios-dots-shake' : ''}`}>
            {Array.from({ length: PASSCODE_LENGTH }).map((_, idx) => (
              <div 
                key={idx} 
                className={`ios-dot ${passcode.length > idx ? 'filled' : ''}`} 
              />
            ))}
          </div>

          {errorText && <p className="ios-error-text">{errorText}</p>}

          <div className="ios-keypad">
            {KEYPAD_BUTTONS.map(btn => (
              <button
                key={btn.num}
                type="button"
                className="ios-key"
                onClick={() => handleAddDigit(btn.num)}
              >
                <span className="ios-key-num">{btn.num}</span>
                {btn.letters && <span className="ios-key-letters">{btn.letters}</span>}
              </button>
            ))}

            <button 
              type="button" 
              className="ios-key-text"
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? 'Ẩn' : 'Gợi ý'}
            </button>

            <button
              type="button"
              className="ios-key"
              onClick={() => handleAddDigit('0')}
            >
              <span className="ios-key-num">0</span>
            </button>

            <button
              type="button"
              className="ios-key-text"
              onClick={handleDeleteDigit}
            >
              Xóa
            </button>
          </div>

          {showHint && (
            <div className="ios-hint-box">
              💡 Mật mã gồm 6 số: Ngày kỷ niệm đặc biệt (080611)
            </div>
          )}

          <p className="tap-hint">Chạm vào màn hình để thả tim ✨</p>
        </main>
      ) : (
        /* MAIN UNLOCKED CARD */
        <main className={`card-container ${isOpen ? 'open' : ''} unlocked-anim`} onClick={e => e.stopPropagation()}>
          {showFront ? (
            <div 
              className="card-front" 
              style={{ 
                opacity: isOpen ? 0 : 1, 
                transform: isOpen ? 'scale(0.92) translateY(10px)' : 'scale(1) translateY(0)' 
              }}
            >
              <div className="front-avatar-wrapper" onClick={() => setZoomedPhoto(photos[0].url)}>
                <img 
                  src={photos[0].url} 
                  alt="Hân" 
                  className="front-avatar-img" 
                  onError={(e) => {
                    if (photos[0].fallbackUrl && e.currentTarget.src !== photos[0].fallbackUrl) {
                      e.currentTarget.src = photos[0].fallbackUrl
                    }
                  }}
                />
                <span className="avatar-badge">🌸</span>
              </div>
              <h1 className="title">Gửi Hân</h1>
              <p className="subtitle">Có một bức thư bí mật đặc biệt dành riêng cho cậu...</p>
              <button className="main-btn" onClick={handleOpen}>
                <span>Mở ra xem nhé</span>
                <span className="btn-heart">❤️</span>
              </button>
              <p className="tap-hint">Chạm vào màn hình để thả tim ✨</p>
            </div>
          ) : (
            <div className="card-inside visible">
              <div className="top-badge">✨ Dành riêng cho Hân ✨</div>
              <h2 className="romantic-text">Gửi người đặc biệt nhất...</h2>

              {/* POLAROID PHOTO FRAME */}
              <div className="polaroid-wrapper">
                <div 
                  className="polaroid-card" 
                  onClick={() => setZoomedPhoto(activePhoto.url)}
                  title="Bấm để phóng to ảnh"
                >
                  <div className="polaroid-pin">📌</div>
                  <div className="polaroid-img-box">
                    <img 
                      src={activePhoto.url} 
                      alt="Ảnh của Hân" 
                      className="polaroid-img" 
                      onError={(e) => {
                        if (activePhoto.fallbackUrl && e.currentTarget.src !== activePhoto.fallbackUrl) {
                          e.currentTarget.src = activePhoto.fallbackUrl
                        }
                      }}
                    />
                  </div>
                  <p className="polaroid-caption">{activePhoto.caption}</p>
                </div>

                {/* Photo Controls */}
                {photos.length > 1 && (
                  <div className="photo-nav-row">
                    <button className="photo-nav-btn" onClick={handlePrevPhoto} title="Ảnh trước">
                      ◀
                    </button>
                    <div className="photo-dots">
                      {photos.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`p-dot ${currentPhotoIdx === idx ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); setCurrentPhotoIdx(idx); }}
                        />
                      ))}
                    </div>
                    <button className="photo-nav-btn" onClick={handleNextPhoto} title="Ảnh sau">
                      ▶
                    </button>
                  </div>
                )}
              </div>
              
              <div className="message">
                <p>Cảm ơn Hân vì đã luôn là một phần thật ấm áp và tuyệt vời.</p>
                <p>Chúc cậu mỗi ngày thức dậy đều tràn đầy niềm vui, may mắn và hạnh phúc ngập tràn.</p>
                <p className="highlight-quote">
                  &ldquo;Mỗi nụ cười của Hân đều làm cho thế giới này rực rỡ và dịu dàng hơn rất nhiều.&rdquo;
                </p>
              </div>

              <div className="card-footer">
                <div className="heart-pulse">💖</div>
                <button className="secondary-btn" onClick={handleClose}>
                  <span>Gấp thư lại</span> 💌
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* FULLSCREEN PHOTO MODAL (ZOOM) */}
      {zoomedPhoto && (
        <div className="lightbox-overlay" onClick={() => setZoomedPhoto(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={zoomedPhoto} alt="Ảnh phóng to của Hân" className="lightbox-img" />
            <button className="lightbox-close-btn" onClick={() => setZoomedPhoto(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
