import zipfile
import xml.etree.ElementTree as ET

p = r'd:\Projects\For Home\AVYRA\avyra stuff.xlsx'
ns = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
z = zipfile.ZipFile(p)

ss = z.read('xl/sharedStrings.xml').decode('utf-8', 'ignore')
sroot = ET.fromstring(ss)
strings = [''.join(t.text or '' for t in si.iter(ns + 't')) for si in sroot.findall(ns + 'si')]

sheet = z.read('xl/worksheets/sheet1.xml').decode('utf-8', 'ignore')
root = ET.fromstring(sheet)

def cell_value(c):
    t = c.get('t')
    v = c.find(ns + 'v')
    if v is None:
        return None
    val = v.text
    if t == 's':
        return strings[int(val)]
    return val

for row in root.iter(ns + 'row'):
    cells = []
    for c in row.findall(ns + 'c'):
        cells.append((c.get('r'), cell_value(c)))
    print(cells)
