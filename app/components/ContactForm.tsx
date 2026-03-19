"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "お名前を入力してください。";
    if (!email.trim()) {
      errs.email = "メールアドレスを入力してください。";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "正しいメールアドレスを入力してください。";
    }
    if (!message.trim()) errs.message = "お問い合わせ内容を入力してください。";
    else if (message.trim().length < 10) errs.message = "10文字以上入力してください。";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("submitting");

    // mailto リンクで送信（静的サイト向けシンプル実装）
    const subject = encodeURIComponent(`【文字数カウンター】お問い合わせ: ${name}`);
    const body = encodeURIComponent(
      `お名前: ${name}\nメールアドレス: ${email}\n\n【お問い合わせ内容】\n${message}`
    );
    window.location.href = `mailto:dora06290@gmail.com?subject=${subject}&body=${body}`;

    // 送信完了表示（mailto遷移後）
    setTimeout(() => {
      setFormState("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 500);
  }

  if (formState === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-lg font-bold text-green-800 mb-2">メールアプリが開きました</h3>
        <p className="text-green-700 text-sm">
          メールアプリで内容をご確認の上、送信してください。
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="mt-4 text-sm text-green-600 hover:underline"
        >
          フォームに戻る
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* お名前 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          お名前 <span className="text-red-500 text-xs">必須</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="山田 太郎"
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition
            ${errors.name ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* メールアドレス */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          メールアドレス <span className="text-red-500 text-xs">必須</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition
            ${errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* お問い合わせ内容 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          お問い合わせ内容 <span className="text-red-500 text-xs">必須</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="ご意見・ご要望・不具合報告など、お気軽にご記入ください。"
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-y
            ${errors.message ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        <p className="text-xs text-gray-400 mt-1 text-right">{message.length}文字</p>
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full bg-blue-500 hover:bg-blue-600 active:scale-[0.99] text-white font-medium py-3 rounded-lg transition-all text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? "送信中..." : "送信する（メールアプリが開きます）"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        送信ボタンを押すとメールアプリが起動します。ご利用の環境によってはメールアプリが設定されていない場合があります。
        その場合は直接 dora06290@gmail.com までご連絡ください。
      </p>
    </form>
  );
}
