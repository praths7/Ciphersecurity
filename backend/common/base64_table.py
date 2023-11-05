import base64
import numpy as np
import pandas as pd
import dataframe_image as dfi

def generate_base64_mapping(values, columns, key):
    df = pd.DataFrame(np.array(values), index=list(key), columns=columns)
    df.reset_index(inplace=True)
    df_styled = df.style.background_gradient()
    filepath = './temp/table.png'
    dfi.export(df_styled, filepath, max_cols=-1)
    binary_fc = open(filepath, 'rb').read()
    base64_utf8_str = base64.b64encode(binary_fc).decode('utf-8')
    ext = filepath.split('.')[-1]
    dataurl = f'data:image/{ext};base64,{base64_utf8_str}'
    return dataurl