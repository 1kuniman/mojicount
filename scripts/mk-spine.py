import sys
from PIL import Image, ImageFilter, ImageDraw, ImageChops
S=sys.argv[1]
CFG={ # 布地を取る帯(x0,y0,x1,y1)、上の飾り、下の飾り、箔の色
 'kokoro':dict(strip=(452,370,572,1080),top=(172,104,290,272),bot=(470,20,555,105),foil=(226,232,238)),
 'hana':  dict(strip=(452,400,572,1030),top=(30,580,170,710),bot=(672,160,790,255),foil=(240,222,140)),
 'kaori': dict(strip=(445,370,565,1090),top=(432,128,592,318),bot=(470,28,555,112),foil=(222,178,92)),
}
def feather(size,r):
    m=Image.new('L',size,0);d=ImageDraw.Draw(m);d.rounded_rectangle((r,r,size[0]-r,size[1]-r),radius=r,fill=255);return m.filter(ImageFilter.GaussianBlur(r*.6))
for n,c in CFG.items():
    cov=Image.open(f'{S}/{n}-cover.png').convert('RGB')
    sp=cov.crop(c['strip']).resize((170,1000),Image.LANCZOS)
    def put(box,cy,maxw):
        m=cov.crop(box);s=min(maxw/m.width,1.0);m=m.resize((int(m.width*s),int(m.height*s)),Image.LANCZOS)
        sp.paste(m,((170-m.width)//2,cy-m.height//2),feather(m.size,10))
    put(c['top'],150,128);put(c['bot'],905,64)
    d=ImageDraw.Draw(sp)
    for y in (38,44,956,962): d.line((16,y,154,y),fill=c['foil'],width=1 if y in(44,956) else 2)
    # 背の丸み：左右を少し暗く、中央やや左を明るく
    g=Image.new('L',(170,1),0)
    for x in range(170):
        t=x/169;v=int(255*(0.80+0.26*(1-abs(t-0.38)/0.62)**1.4));g.putpixel((x,0),min(255,v))
    g=g.resize((170,1000));sp=ImageChops.multiply(sp,Image.merge('RGB',(g,g,g)))
    sp.save(f'{S}/{n}-spine.png')
sheet=Image.new('RGB',(170*3+40,1000),'#333')
for i,n in enumerate(CFG): sheet.paste(Image.open(f'{S}/{n}-spine.png'),(10+i*180,0))
ref=Image.open('/home/claude/mojicount/public/assets/ishi-spine.jpg');big=Image.new('RGB',(sheet.width+190,1000),'#333');big.paste(sheet,(0,0));big.paste(ref,(sheet.width+10,0));big.save(f'{S}/spines_sheet.png')
