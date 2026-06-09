"use client";
import { useMemo, useState } from "react";
import {
  parseYmd,
  fullDiff,
  shiftDays,
  formatJa,
  toYmd,
  toUnix,
  fromUnix,
  formatDateTime,
} from "@/lib/datetime";

const ACCENT = "#2f7d72";

type Tab = "diff" | "shift" | "unix";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <div className="text-xs text-ink-faint">{label}</div>
      <div className="mt-1 font-mono text-2xl font-semibold text-ink tnum break-all">{value}</div>
      {sub && <div className="text-[11px] text-ink-faint mt-0.5">{sub}</div>}
    </div>
  );
}

export default function DateTool() {
  const today = useMemo(() => toYmd(new Date()), []);
  const [tab, setTab] = useState<Tab>("diff");

  // 期間計算
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const [bothEnds, setBothEnds] = useState(false);
  const diff = useMemo(() => {
    const a = parseYmd(start);
    const b = parseYmd(end);
    if (!a || !b) return null;
    return fullDiff(a, b);
  }, [start, end]);

  // 加減算
  const [base, setBase] = useState(today);
  const [delta, setDelta] = useState("7");
  const shifted = useMemo(() => {
    const a = parseYmd(base);
    const n = parseInt(delta, 10);
    if (!a || isNaN(n)) return null;
    return shiftDays(a, n);
  }, [base, delta]);

  // Unix
  const [dtLocal, setDtLocal] = useState("");
  const [unixIn, setUnixIn] = useState(String(toUnix(new Date())));
  const unixFromDt = useMemo(() => {
    if (!dtLocal) return null;
    const d = new Date(dtLocal);
    return isNaN(d.getTime()) ? null : toUnix(d);
  }, [dtLocal]);
  const dtFromUnix = useMemo(() => {
    const n = parseInt(unixIn, 10);
    if (isNaN(n)) return null;
    return fromUnix(n);
  }, [unixIn]);

  const tabBtn = (id: Tab, label: string) => (
    <button
      onClick={() => setTab(id)}
      className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
      style={
        tab === id
          ? { borderColor: ACCENT, color: ACCENT, backgroundColor: "rgba(47,125,114,0.06)" }
          : { borderColor: "#ddd3c0", color: "#4a443c" }
      }
    >
      {label}
    </button>
  );

  const inputCls =
    "rounded-lg border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-shu/60 focus:ring-2 focus:ring-shu/15";

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {tabBtn("diff", "期間（日数差）")}
        {tabBtn("shift", "何日後・何日前")}
        {tabBtn("unix", "Unix時間")}
      </div>

      {tab === "diff" && (
        <div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="text-sm text-ink-soft">
              開始日<br />
              <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={`mt-1 ${inputCls}`} />
            </label>
            <span className="pb-3 text-ink-faint">→</span>
            <label className="text-sm text-ink-soft">
              終了日<br />
              <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className={`mt-1 ${inputCls}`} />
            </label>
            <label className="flex items-center gap-2 text-sm text-ink pb-2.5 cursor-pointer">
              <input type="checkbox" checked={bothEnds} onChange={(e) => setBothEnds(e.target.checked)} className="w-4 h-4 accent-shu" />
              両端を含める
            </label>
          </div>
          {diff && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="日数" value={`${(diff.totalDays + (bothEnds ? 1 : 0)).toLocaleString()} 日`} sub={bothEnds ? "両端入れ" : "片端入れ"} />
              <Stat label="年月日" value={`${diff.years}年${diff.months}ヶ月${diff.days}日`} />
              <Stat label="週" value={`${diff.totalWeeks}週 ${diff.remDays}日`} />
              <Stat label="時間" value={`${diff.totalHours.toLocaleString()} 時間`} />
            </div>
          )}
        </div>
      )}

      {tab === "shift" && (
        <div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="text-sm text-ink-soft">
              基準日<br />
              <input type="date" value={base} onChange={(e) => setBase(e.target.value)} className={`mt-1 ${inputCls}`} />
            </label>
            <label className="text-sm text-ink-soft">
              加える日数（マイナスで過去）<br />
              <input type="number" value={delta} onChange={(e) => setDelta(e.target.value)} className={`mt-1 ${inputCls} w-40 font-mono`} />
            </label>
          </div>
          {shifted && (
            <div className="mt-5">
              <div className="rounded-xl border-2 p-5" style={{ borderColor: ACCENT, backgroundColor: "rgba(47,125,114,0.05)" }}>
                <div className="text-xs text-ink-faint">結果</div>
                <div className="font-mincho text-3xl font-bold text-ink mt-1">{formatJa(shifted)}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "unix" && (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper p-5">
            <h3 className="font-medium text-ink mb-3 text-sm">日時 → Unix時間</h3>
            <input
              type="datetime-local"
              step={1}
              value={dtLocal}
              onChange={(e) => setDtLocal(e.target.value)}
              className={`${inputCls} w-full`}
            />
            <div className="mt-3 font-mono text-2xl text-ink tnum break-all">
              {unixFromDt !== null ? unixFromDt.toLocaleString() : "—"}
            </div>
            <p className="text-[11px] text-ink-faint mt-1">秒（UTC基準のエポック秒）</p>
          </div>
          <div className="rounded-xl border border-line bg-paper p-5">
            <h3 className="font-medium text-ink mb-3 text-sm">Unix時間 → 日時</h3>
            <input
              type="number"
              value={unixIn}
              onChange={(e) => setUnixIn(e.target.value)}
              className={`${inputCls} w-full font-mono`}
            />
            <div className="mt-3 font-mono text-lg text-ink break-all">
              {dtFromUnix ? formatDateTime(dtFromUnix) : "—"}
            </div>
            <p className="text-[11px] text-ink-faint mt-1">お使いの端末のタイムゾーンで表示</p>
          </div>
        </div>
      )}
    </div>
  );
}
