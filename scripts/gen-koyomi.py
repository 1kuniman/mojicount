# 2026年12月〜2027年12月の暦（日の干支・一粒万倍日・天赦日・寅の日・巳の日など）を計算して JSON に書き出す
#   python3 scripts/gen-koyomi.py content/koyomi-2027.json
# 節入りの日は国立天文台「令和9年(2027)暦要項」「令和8年(2026)暦要項」の二十四節気（中央標準時）による。
# 日の干支は 2024-01-01 が甲子（六十干支の一番目）であることを基準に数える。
import json,sys,datetime as dt
KAN="甲乙丙丁戊己庚辛壬癸";SHI="子丑寅卯辰巳午未申酉戌亥"
BASE=dt.date(2024,1,1)
def kanshi(d):
    n=(d-BASE).days%60;return KAN[n%10]+SHI[n%12]
# 節（節月の始まり）。(月,日,節の名,節月の十二支)
SETSU=[(2026,11,7,"立冬","亥"),(2026,12,7,"大雪","子"),(2027,1,5,"小寒","丑"),(2027,2,4,"立春","寅"),(2027,3,6,"啓蟄","卯"),(2027,4,5,"清明","辰"),(2027,5,6,"立夏","巳"),
 (2027,6,6,"芒種","午"),(2027,7,7,"小暑","未"),(2027,8,8,"立秋","申"),(2027,9,8,"白露","酉"),(2027,10,8,"寒露","戌"),(2027,11,8,"立冬","亥"),(2027,12,7,"大雪","子")]
# 一粒万倍日：節月ごとに決まった日の十二支
MANBAI={"寅":"丑午","卯":"酉寅","辰":"子卯","巳":"卯辰","午":"巳午","未":"酉午","申":"子未","酉":"卯申","戌":"酉午","亥":"酉戌","子":"亥子","丑":"卯子"}
# 天赦日：立春〜の春は戊寅、立夏〜の夏は甲午、立秋〜の秋は戊申、立冬〜の冬は甲子
SEASON={"寅":"戊寅","卯":"戊寅","辰":"戊寅","巳":"甲午","午":"甲午","未":"甲午","申":"戊申","酉":"戊申","戌":"戊申","亥":"甲子","子":"甲子","丑":"甲子"}
def setsu_of(d):
    cur=None
    for y,m,dd,nm,br in SETSU:
        if d>=dt.date(y,m,dd):cur=br
    return cur
W="月火水木金土日"
days=[]
d=dt.date(2026,12,1)
while d<=dt.date(2027,12,31):
    ks=kanshi(d);br=setsu_of(d);tags=[]
    if ks[1] in MANBAI[br]:tags.append("manbai")
    if ks==SEASON[br]:tags.append("tensha")
    if ks[1]=="寅":tags.append("tora")
    if ks[1]=="巳":tags.append("mi")
    if ks=="己巳":tags.append("tsuchinotomi")
    if ks=="甲子":tags.append("kinoene")
    days.append({"d":d.isoformat(),"w":W[d.weekday()],"ks":ks,"t":tags})
    d+=dt.timedelta(1)
json.dump({"year":2027,"setsu":[{"d":f"{y}-{m:02d}-{dd:02d}","n":nm} for y,m,dd,nm,br in SETSU if y==2027],"days":days},open(sys.argv[1],"w"),ensure_ascii=False,separators=(",",":"))
D26=[x for x in days if x["d"]<"2027"];days=[x for x in days if x["d"]>="2027"]
print("2026-12",[(x["d"][8:],x["t"]) for x in D26 if "manbai" in x["t"] or "tensha" in x["t"]])
def ls(tag):return [f"{int(x['d'][5:7])}/{int(x['d'][8:])}({x['w']})" for x in days if tag in x["t"]]
for t in ["tensha","tsuchinotomi","kinoene"]:print(t,ls(t))
print("tensha+manbai",[f"{int(x['d'][5:7])}/{int(x['d'][8:])}" for x in days if "tensha" in x["t"] and "manbai" in x["t"]])
for m in range(1,13):print(m,"manbai",[int(x['d'][8:]) for x in days if "manbai" in x["t"] and int(x['d'][5:7])==m])
print("tora",len(ls("tora")),"mi",len(ls("mi")),"manbai",len(ls("manbai")))
