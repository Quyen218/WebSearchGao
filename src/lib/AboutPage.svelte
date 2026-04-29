<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="about-page">
  <!-- Hero -->
  <section class="about-hero">
    <div class="hero-bg-shapes">
      <div class="shape s1"></div>
      <div class="shape s2"></div>
      <div class="shape s3"></div>
    </div>
    <div class="hero-icon">
      <img
        src="/logo.jpg"
        alt="Gạo Lý Nhân Logo"
        width="80"
        height="80"
        style="object-fit: contain; border-radius: 16px; border: 1.5px solid var(--border);"
      />
    </div>
    <h1 class="hero-title">Gạo Lý Nhân</h1>
    <p class="hero-subtitle">Gạo sạch – Chất lượng cao – Uy tín từ nhà nông</p>
    <div class="hero-badges">
      <span class="badge">🌾 Nguồn gốc rõ ràng</span>
      <span class="badge">✅ Chất lượng kiểm định</span>
      <span class="badge">🚚 Giao hàng tận nơi</span>
    </div>
  </section>

  <!-- Story -->
  <section class="about-section">
    <div class="section-card">
      <div class="section-icon">📖</div>
      <h2>Câu chuyện của chúng tôi</h2>
      <p>
        Gạo Lý Nhân được thành lập với mong muốn mang đến những hạt gạo sạch,
        ngon và đảm bảo chất lượng từ những cánh đồng tươi tốt. Được thành lập
        từ năm 1999, chúng tôi tự hào cung cấp các sản phẩm gạo đặc sản đến tay
        người tiêu dùng một cách trực tiếp nhất.
      </p>
      <p>
        Chúng tôi hợp tác trực tiếp với các doanh nghiệp địa phương, đảm bảo quy
        trình canh tác theo hướng hữu cơ, không sử dụng hóa chất độc hại, mang
        lại hạt gạo thơm ngon tự nhiên và an toàn cho sức khỏe cả gia đình.
      </p>
    </div>
  </section>

  <!-- Values -->
  <section class="about-section">
    <h2 class="section-title-standalone">Giá trị cốt lõi</h2>
    <div class="values-grid">
      <div class="value-card">
        <div class="value-icon">🌿</div>
        <h3>Sạch & Tươi</h3>
        <p>
          Gạo được thu hoạch và đóng gói sạch sẽ, đảm bảo độ tươi ngon tối đa.
        </p>
      </div>
      <div class="value-card">
        <div class="value-icon">🤝</div>
        <h3>Uy tín</h3>
        <p>
          Cam kết đúng giá, đúng chất lượng. Hàng ngàn khách hàng đã tin dùng
          sản phẩm của chúng tôi.
        </p>
      </div>
      <div class="value-card">
        <div class="value-icon">💰</div>
        <h3>Giá hợp lý</h3>
        <p>– Giá tốt nhất cho người tiêu dùng.</p>
      </div>
      <div class="value-card">
        <div class="value-icon">🚀</div>
        <h3>Giao hàng nhanh</h3>
        <p>
          Giao hàng nhanh chóng trong ngày tại khu vực nội thành và 1-2 ngày các
          tỉnh lân cận.
        </p>
      </div>
    </div>
  </section>

  <!-- Products highlight -->
  <section class="about-section">
    <div class="section-card highlight-card">
      <div class="section-icon">🌾</div>
      <h2>Sản phẩm nổi bật</h2>
      <div class="product-highlights">
        <div class="highlight-item">
          <span class="hi-dot"></span>
          <span><strong>Gạo ST25</strong> – Gạo ngon nhất thế giới 2019</span>
        </div>
        <div class="highlight-item">
          <span class="hi-dot"></span>
          <span><strong>Gạo Quê Rằn</strong> – Giữ tối đa dưỡng chất</span>
        </div>
        <div class="highlight-item">
          <span class="hi-dot"></span>
          <span
            ><strong>Gạo Nếp Cái Hoa Vàng</strong> – Nếp truyền thống chất lượng
            cao</span
          >
        </div>
        <div class="highlight-item">
          <span class="hi-dot"></span>
          <span
            ><strong>Gạo Hữu Cơ</strong> – Canh tác tự nhiên, không hóa chất</span
          >
        </div>
        <div class="highlight-item">
          <span class="hi-dot"></span>
          <span
            ><strong>Gia vị & Phụ liệu</strong> – Muối, mắm, tương, gia vị các loại</span
          >
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="about-section">
    <h2 class="section-title-standalone">Liên hệ & Đặt hàng</h2>
    <div class="contact-grid">
      <a
        class="contact-card"
        href="https://zalo.me/0902608351"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="contact-icon zalo-icon">💬</div>
        <div>
          <div class="contact-label">Zalo</div>
          <div class="contact-value">Chat & Đặt hàng ngay</div>
        </div>
        <svg
          class="arrow"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="7" y1="17" x2="17" y2="7" /><polyline
            points="7 7 17 7 17 17"
          />
        </svg>
      </a>
      <div class="contact-card non-link">
        <div class="contact-icon">📍</div>
        <div>
          <div class="contact-label">Địa chỉ</div>
          <div class="contact-value">323 Trưng Nữ Vương, TP Đà Nẵng</div>
        </div>
      </div>
      <div class="contact-card non-link">
        <div class="contact-icon">⏰</div>
        <div>
          <div class="contact-label">Giờ làm việc</div>

          <div class="contact-value">
            Thứ 2 – Thứ 7:<br /> 7:00 – 12:00 sáng <br /> 14:00 – 19:00 chiều
          </div>
          <div class="contact-value">
            Chủ Nhật:<br /> 7:00 – 12:00 sáng <br /> 14:00 – 18:00 chiều
          </div>
        </div>
      </div>
      <div class="contact-card non-link">
        <div class="contact-icon">📦</div>
        <div>
          <div class="contact-label">Đặt hàng tối thiểu</div>
          <div class="contact-value">Từ 5kg, miễn phí giao 10kg+</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <h2>Khám phá sản phẩm ngay</h2>
    <p>Hơn {0} sản phẩm đang chờ bạn</p>
    <button class="cta-btn" on:click={() => dispatch("navigate", "home")}>
      Xem sản phẩm
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  </section>
</div>

<style>
  .about-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px 60px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  /* Hero */
  .about-hero {
    position: relative;
    text-align: center;
    padding: 60px 20px 50px;
    border-radius: 24px;
    background: var(--card-bg);
    border: 1px solid var(--border);
    overflow: hidden;
    margin-top: 28px;
  }

  .hero-bg-shapes {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    opacity: 0.07;
  }

  .s1 {
    width: 300px;
    height: 300px;
    background: var(--accent);
    top: -80px;
    right: -80px;
  }

  .s2 {
    width: 200px;
    height: 200px;
    background: #c9a84c;
    bottom: -60px;
    left: -60px;
  }

  .s3 {
    width: 150px;
    height: 150px;
    background: var(--accent);
    bottom: 20px;
    right: 100px;
  }

  .hero-icon {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
  }

  .hero-title {
    font-size: 2.4rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 10px;
    letter-spacing: -0.5px;
  }

  .hero-subtitle {
    font-size: 1.05rem;
    color: var(--text-muted);
    margin: 0 0 24px;
  }

  .hero-badges {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .badge {
    background: var(--tag-bg);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    font-size: 0.82rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 20px;
  }

  /* Sections */
  .about-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section-title-standalone {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    padding-left: 4px;
  }

  .section-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px 32px;
  }

  .section-icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }

  .section-card h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 14px;
  }

  .section-card p {
    color: var(--text-secondary);
    line-height: 1.75;
    margin: 0 0 12px;
    font-size: 0.95rem;
  }

  .section-card p:last-child {
    margin-bottom: 0;
  }

  /* Values Grid */
  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
  }

  .value-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 22px 18px;
    transition:
      border-color 0.2s,
      transform 0.2s;
  }

  .value-card:hover {
    border-color: var(--accent);
    transform: translateY(-3px);
  }

  .value-icon {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  .value-card h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 8px;
  }

  .value-card p {
    font-size: 0.83rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  /* Product highlights */
  .highlight-card {
    background: linear-gradient(
      135deg,
      rgba(74, 124, 89, 0.08),
      rgba(201, 168, 76, 0.08)
    );
  }

  .product-highlights {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .highlight-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .hi-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  /* Contact */
  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .contact-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 18px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition:
      border-color 0.2s,
      transform 0.2s;
    text-decoration: none;
    color: inherit;
  }

  .contact-card:not(.non-link):hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .contact-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .contact-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: var(--text-muted);
    font-weight: 600;
    margin-bottom: 3px;
  }

  .contact-value {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .arrow {
    margin-left: auto;
    color: var(--accent);
    flex-shrink: 0;
  }

  /* CTA */
  .cta-section {
    text-align: center;
    padding: 40px 20px;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 24px;
    background: linear-gradient(
      135deg,
      rgba(74, 124, 89, 0.12),
      rgba(201, 168, 76, 0.08)
    );
  }

  .cta-section h2 {
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 8px;
  }

  .cta-section p {
    color: var(--text-muted);
    margin: 0 0 24px;
    font-size: 0.95rem;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition:
      opacity 0.18s,
      transform 0.18s;
  }

  .cta-btn:hover {
    opacity: 0.88;
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    .hero-title {
      font-size: 1.8rem;
    }
    .section-card {
      padding: 22px 18px;
    }
    .values-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 400px) {
    .values-grid {
      grid-template-columns: 1fr;
    }
    .contact-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
