import sys
from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        
        # O logo tem roxo (R baixo, G muito baixo, B alto)
        # e laranja (R alto, G médio/baixo, B baixo).
        # Os verdes (fundo e círculo) têm G muito alto (frequentemente maior que R e B)
        # Vamos definir: se Verde > Roxo e Verde > Laranja (grosso modo, se G > R e G > B) -> é verde!
        # Na verdade, no verde limão (210, 254, 48), G é o maior.
        # No círculo verde, G também será dominante ou próximo de dominante.
        # No Roxo (106, 37, 213), B é dominante, G é o menor.
        # No Laranja (246, 80, 47), R é dominante, B é o menor, G é médio.
        
        # Regra simples para manter apenas o roxo e o laranja:
        # Se o canal Verde (G) for maior que o Vermelho (R) E maior que o Azul (B), com certeza é fundo verde.
        # Ou, se for branco/cinza claro, também removemos.
        
        # Para ser seguro, vamos preservar tudo que NÃO for verde-ish ou branco-ish.
        # Um pixel é fundo se:
        # 1. É esverdeado: g > r - 20 and g > b - 20
        # 2. É muito claro (quase branco/transparente do antialiasing): r > 200 and g > 200 and b > 200
        
        # Melhor abordagem para o Roxo: B > R e B > G.
        # Melhor abordagem para o Laranja: R > 150 e G < 150 e B < 100
        
        is_purple = (b > r) and (b > g) and (r < 180)
        is_orange = (r > 180) and (g < 150) and (b < 100)
        
        # Algumas bordas (antialiasing) podem misturar o roxo com o verde.
        # Vamos manter se for roxo ou laranja. Caso contrário, alpha = 0.
        
        # Uma heurística mais suave:
        if is_purple or is_orange:
            # Manter original
            new_data.append(item)
        else:
            # Se a cor estiver misturada (antialiasing), B > G normalmente indica influência do roxo
            if b > g + 20 or (r > g + 20 and r > 150): 
                # É transição, vamos manter mas talvez com alpha reduzido? Não, manter.
                new_data.append(item)
            else:
                new_data.append((255, 255, 255, 0)) # Transparente
                
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Background removido com sucesso!")

if __name__ == "__main__":
    remove_background("public/logo.png", "public/logo-transparent.png")
