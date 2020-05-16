import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import date
import matplotlib.dates as mdates
from matplotlib.pyplot import xlabel, ylabel, plot, show, title, savefig
from scipy.optimize import curve_fit
import datetime

def plot_corona(filename, start_date, end_date, uti, leitos, state):

    results = pd.read_csv(filename)
    resultsNew = results.astype(int)
    #start = pd.datetime(2020, 3, 14)
    #end = pd.datetime(2020, 5, 31)
    index = pd.date_range(start_date, end_date)
    print(len(index), ' ', len(results))
    resultsNew['data'] = pd.to_datetime(index)

    nowcasting = pd.read_csv('arquivo_srag.csv', sep=';')
    nowcasting['data'] =  pd.to_datetime(nowcasting['data'] )
    nowcasting = nowcasting[ nowcasting['estado'] == state ]

    popt, pcov = curve_fit(func, np.linspace(1, len(nowcasting), len(nowcasting) ), nowcasting['casosAcumulados'], p0=(1, 1e-6, 1))
    maxdate = max(nowcasting['data'])+ datetime.timedelta(days=1)
    datas = pd.date_range(maxdate, end_date)
    xx = np.linspace(len(nowcasting), len(nowcasting)+len(datas), len(datas))
    yy = func(xx, *popt)

    plt.figure()

    plt.plot(resultsNew['data'], resultsNew['C1'], linewidth = 3)
    plt.plot(resultsNew['data'], resultsNew['C2'], linewidth = 3)
    plt.plot(resultsNew['data'], resultsNew['C3'], linewidth = 3)
    plt.plot(nowcasting['data'], nowcasting['casosAcumulados'], linewidth = 3 )
    plt.plot(datas, yy,linewidth = 3, linestyle = '-.' )
    plt.xlabel('data')
    plt.ylabel('Total de Casos')
    plt.gca().set_yscale('log')
    

    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%d/%m'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=15))

    plt.setp(plt.gca().get_xticklabels(), rotation=45, ha="right",
            rotation_mode="anchor")
    plt.legend([ "Atual", "C60" , "C75", "SRAG"])
    plt.savefig(state+'_Total_de_Casos.png')
    plt.show()

    plt.figure()
    plt.plot(resultsNew['data'],resultsNew['H1'],  linewidth = 3)
    plt.plot(resultsNew['data'],resultsNew['H2'], linewidth = 3 )
    plt.plot(resultsNew['data'],resultsNew['H3'], linewidth = 3)
    plt.xlabel('data')
    plt.ylabel('Leitos Ocupados')
    plt.gca().axhline(y=leitos, color='red', linestyle='--', linewidth = 3)
    #plt.gca().text(1, leitos+50, ' ' + str(leitos))
    plt.gca().set_yscale('log')
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%d/%m'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=15))
    plt.setp(plt.gca().get_xticklabels(), rotation=45, ha="right",
            rotation_mode="anchor")
    plt.legend([ "Atual", "C60" , "C75"])
    plt.savefig(state+'_Leitos_Ocupados.png')
    plt.show()


    plt.figure()
    plt.plot(resultsNew['data'],resultsNew['U1'],  linewidth = 3)
    plt.plot(resultsNew['data'],resultsNew['U2'], linewidth = 3 )
    plt.plot(resultsNew['data'],resultsNew['U3'], linewidth = 3)
    plt.xlabel('data')
    plt.ylabel('Leitos de UTI')
    plt.gca().axhline(y=uti, color='red', linestyle='--', linewidth = 3)
    #plt.gca().text(1, leitos+50, ' ' + str(leitos))
    plt.gca().set_yscale('log')
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%d/%m'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=15))
    plt.setp(plt.gca().get_xticklabels(), rotation=45, ha="right",
            rotation_mode="anchor")
    plt.legend([ "Atual", "C60" , "C75"])
    plt.savefig(state+'_Leitos_de_UTI.png')
    plt.show()

    popt, pcov = curve_fit(func, np.linspace(1, len(nowcasting), len(nowcasting) ), nowcasting['obitosAcumulados'], p0=(1, 1e-6, 1))
    maxdate = max(nowcasting['data'])+ datetime.timedelta(days=1)
    datas = pd.date_range(maxdate, end_date)
    xx = np.linspace(len(nowcasting), len(nowcasting)+len(datas), len(datas))
    yy = func(xx, *popt)

    plt.figure()
    plt.plot(resultsNew['data'],resultsNew['M1'],  linewidth = 3)
    plt.plot(resultsNew['data'],resultsNew['M2'], linewidth = 3 )
    plt.plot(resultsNew['data'],resultsNew['M3'], linewidth = 3)
    plt.plot(nowcasting['data'], nowcasting['obitosAcumulados'], linewidth = 3 )
    plt.plot(datas, yy,linewidth = 3, linestyle = '-.' )
    plt.xlabel('data')
    plt.ylabel('Óbitos Acumulados')
    #plt.text(1, leitos+50, ' ' + str(leitos))
    plt.gca().set_yscale('log')
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%d/%m'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=15))
    plt.setp(plt.gca().get_xticklabels(), rotation=45, ha="right",
            rotation_mode="anchor")
    plt.legend([ "Atual", "C60" , "C75", "SRAG"])
    plt.savefig(state+'_Óbitos_Acumulados.png')
    plt.show()