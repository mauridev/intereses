import React, { Component } from "react";
import CuentaCorriente from './CuentaCorriente/CuentaCorriente';

class Home extends Component {
    state = {
        datosProductor: {
            razonSocial: 'MOVACEL SORIA HUGO EDUARDO NF',
            rut: 70101960019,
            industria: 'CONAPROLE',
            finDeRemision: '30/09/17'
        },
        cuentaCorriente: [
            {key:2119,FECHA:"2015-11-06",IdRegistro_2:12,REFERENCIA:"Pagado por BROU",DEBITO:21021.0,CREDITO:0.0},
            {key:2120,FECHA:"2016-03-11",IdRegistro_2:13,REFERENCIA:"CESION CONAPROLE",DEBITO:14538.0,CREDITO:0.0},
            {key:7350,FECHA:"2016-10-18",IdRegistro_2:1,REFERENCIA:"csv CO.NA.PRO.LE. 09-2016 LTS:52.426,00 Prestación Pecuniaria  0,229 T/C:28,080 FechaTC:18/10/2016",DEBITO:0.0,CREDITO:427.55},
            {key:9182,FECHA:"2016-11-17",IdRegistro_2:1,REFERENCIA:"csv CO.NA.PRO.LE. 10-2016 LTS:84.177,00 Prestación Pecuniaria  0,229 T/C:28,960 FechaTC:17/11/2016",DEBITO:0.0,CREDITO:665.63},
            {key:11817,FECHA:"2016-12-16",IdRegistro_2:1,REFERENCIA:"csv CO.NA.PRO.LE. 11-2016 LTS:95.761,00 Prestación Pecuniaria  0,229 T/C:28,797 FechaTC:16/12/2016",DEBITO:0.0,CREDITO:761.51},
            {key:13813,FECHA:"2017-01-17",IdRegistro_2:1,REFERENCIA:"csv CO.NA.PRO.LE. 12-2016 LTS:97.616,00 Prestación Pecuniaria  0,229 T/C:28,748 FechaTC:17/01/2017",DEBITO:0.0,CREDITO:777.59},
            {key:15637,FECHA:"2017-02-17",IdRegistro_2:1,REFERENCIA:"csv CO.NA.PRO.LE. 01-2017 LTS:93.205,00 Prestación Pecuniaria  0,229 T/C:28,365 FechaTC:17/02/2017",DEBITO:0.0,CREDITO:752.47},
            {key:17436,FECHA:"2017-03-16",IdRegistro_2:1,REFERENCIA:"csv CO.NA.PRO.LE. 02-2017 LTS:67.143,00 Prestación Pecuniaria  0,229 T/C:28,275 FechaTC:16/03/2017",DEBITO:0.0,CREDITO:543.79},
            {key:19338,FECHA:"2017-04-19",IdRegistro_2:2,REFERENCIA:"DJ CO.NA.PRO.LE. 03-2017 LTS:68608 PP:0,217 T/C:28,485 FechaTC:19/04/2017",DEBITO:0.0,CREDITO:522.66},
            {key:23456,FECHA:"2017-05-16",IdRegistro_2:2,REFERENCIA:"DJ CO.NA.PRO.LE. 04-2017 LTS:53880 PP:0,217 T/C:28,103 Fecha Val:07/06/2017",DEBITO:0.0,CREDITO:416.04},
            {key:27952,FECHA:"2017-06-16",IdRegistro_2:2,REFERENCIA:"DJ CO.NA.PRO.LE. 05-2017 LTS:49227 PP:0,217 T/C:28,325 Fecha Val:08/08/2017",DEBITO:0.0,CREDITO:377.13},
            {key:29875,FECHA:"2017-07-19",IdRegistro_2:2,REFERENCIA:"DJ CO.NA.PRO.LE. 06-2017 LTS:48517 PP:0,217 T/C:28,650 Fecha Val:14/08/2017",DEBITO:0.0,CREDITO:367.48},
            {key:32219,FECHA:"2017-08-16",IdRegistro_2:2,REFERENCIA:"DJ CO.NA.PRO.LE. 07-2017 LTS:61134 PP:0,217 T/C:28,639 Fecha Val:07/09/2017",DEBITO:0.0,CREDITO:463.22},
            {key:35697,FECHA:"2017-09-18",IdRegistro_2:2,REFERENCIA:"DJ CO.NA.PRO.LE. 08-2017 LTS:81957 PP:0,217 T/C:28,922 Fecha Val:26/09/2017",DEBITO:0.0,CREDITO:614.92},
            {key:37871,FECHA:"2017-10-18",IdRegistro_2:2,REFERENCIA:"DJ CO.NA.PRO.LE. 09-2017 LTS:99056 PP:0,217 T/C:29,552 Fecha Val:30/10/2017",DEBITO:0.0,CREDITO:727.37},
            {key:39877,FECHA:"2017-11-16",IdRegistro_2:2,REFERENCIA:"DJ CO.NA.PRO.LE. 10-2017 LTS:0 FIN REM.:30/09/2017 PP:0,217 T/C:29,440 Fecha Val:22/11/2017",DEBITO:0.0,CREDITO:0.0}
        ]

    }


    render() {
        return (
            <div>
                <h2>Calculo de intereses</h2>
                <CuentaCorriente />
            </div>
        );
    }
}

export default Home;