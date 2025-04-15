import { useState } from 'react';
import asteroid from './assets/asteroid2.png';
import laser_down from './assets/laser_down.png';
import laser_left from './assets/laser_left.png';
import laser_right from './assets/laser_right.png';
import laser_up from './assets/laser_up.png';
import ship_up from './assets/ship.png';
import ship_down from './assets/ship_down.png';
import ship_left from './assets/ship_left.png';
import ship_right from './assets/ship_right.png';
import logo from './assets/space_shooter_png.png';
import './SpaceShooter.css';

const SpaceShooter = () =>
{
    const [ mapa, setMapa ] = useState( Array.from( {length: 9}, ()=> Array.from( Array(9), ()=>'' ) ) );
    const [ startId, setStartId ] = useState( 0 );
    const [ player, setPlayer ] = useState ( [ 0, 0, ship_up ] );
    const [ click, setClick ] = useState( true );
    const [ score, setScore ] = useState( 0 );
    const [ totalScore, setTotalScore ] = useState( 0 );
    const [ showStart, setShowStart ] = useState( false );
    const [ showEnd, setShowEnd ] = useState( false );
    const [ timeLeft, setTimeLeft ] = useState( 3 );
    const [ go, setGo ] = useState( false );
    const [ dead, setDead ] = useState( false );

    const startGame = () =>
    {
        setScore( 0 );
        setShowStart(true);
        setTimeout( () =>
        {
            setShowStart(false);
        }, 3000)
        let aux = [ ...mapa ];
        aux[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
        setMapa(aux);
        let counter = 0;
        let thisGameId = setInterval( () =>
        {
            counter++;
            counter < 5 && shootAnAsteroid(1000);
            counter >=5 && shootAnAsteroid(500);
            counter >=10 && shootAnAsteroid(300);
            // counter >=15 && shootAnAsteroid(150);
        }, 1000);

        setStartId(thisGameId as unknown as number);
    }

    const loadMap = () =>
    {
        let aux = Array.from( {length: 9}, ()=> Array.from( Array(9), ()=>'' ) );
        aux[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
        setMapa(aux);
    }

    const handleMovement = (event: React.KeyboardEvent) =>
    {
        if(!dead)
        {
            let here = [ Math.floor(mapa.length/2), Math.floor(mapa[0].length/2) ];
            let symbol = ship_down;
            mapa.forEach( (fila, y) => fila.map( (celda, z) =>
            {
                if(celda==ship_down || celda==ship_up || celda==ship_left || celda==ship_right ) { here=[ y, z ]; symbol=celda; }
            } ));
            setPlayer( [ here[0], here[1], symbol ] );
            let auxiliar = [ ...mapa ];
    
            switch(event.key)
            {
                case 'W':
                case 'w':
                    if(event.shiftKey)
                    {
                        let aux = [ ...mapa ];
                        aux[here[0]][here[1]]=ship_up;
                        setPlayer( [ here[0], here[1], ship_up ] );
                        setMapa(aux);
                    }
                    else
                    {
                        if(here[0]-1>=0 && mapa[here[0]-1][here[1]]=='')
                        {
                            let aux = mapa;
                            aux[here[0]][here[1]]='';
                            aux[here[0]-1][here[1]]=ship_up;
                            setPlayer( [ here[0]-1, here[1], ship_up ] );
                            setMapa(aux);
                        }
                        else
                        {
                            if(here[0]-1>=0 && mapa[here[0]-1][here[1]]==asteroid)
                            {
                                auxiliar[here[0]][here[1]] = '';
                                auxiliar[here[0]-1][here[1]] = '💥';
                                death();
                                setScore( Number(score) - 20 );
                                auxiliar[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
                                setPlayer( [ Math.floor(mapa.length/2), Math.floor(mapa[0].length/2), ship_down ] );
                                setMapa(auxiliar);
                                boomAnimation(here[0]-1, 1, 0, here[1], 1);
                            }
                            else
                            {
                                let aux = mapa;
                                aux[here[0]][here[1]]=ship_up;
                                setPlayer( [ here[0], here[1], ship_up ] );
                                setMapa(aux);
                            }
                        }
                    }
                    break;
                case 'A':
                case 'a':
                    if(event.shiftKey)
                    {
                        let aux = mapa;
                        aux[here[0]][here[1]]=ship_left;
                        setPlayer( [ here[0], here[1], ship_left ] );
                        setMapa(aux);
                    }
                    else
                    {
                        if(here[1]-1>=0 && mapa[here[0]][here[1]-1]=='')
                        {
                            let aux = mapa;
                            aux[here[0]][here[1]]='';
                            aux[here[0]][here[1]-1]=ship_left;
                            setPlayer( [ here[0], here[1]-1, ship_left ] );
                            setMapa(aux);
                        }
                        else
                        {
                            if(here[1]-1>=0 && mapa[here[0]][here[1]-1]==asteroid)
                            {
                                auxiliar[here[0]][here[1]] = '';
                                auxiliar[here[0]][here[1]-1] = '💥';
                                death();
                                setScore( Number(score) - 20 );
                                auxiliar[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
                                setPlayer( [ Math.floor(mapa.length/2), Math.floor(mapa[0].length/2), ship_down ] );
                                setMapa(auxiliar);
                                boomAnimation(here[0], 1, 0, here[1]-1, 1);
                            }
                            else
                            {
                                let aux = mapa;
                                aux[here[0]][here[1]]=ship_left;
                                setPlayer( [ here[0], here[1], ship_left ] );
                                setMapa(aux);
                            }
                        }
                    }
                    break;
                case 'S':
                case 's':
                    if(event.shiftKey)
                    {
                        let aux = mapa;
                        aux[here[0]][here[1]]=ship_down;
                        setPlayer( [ here[0], here[1], ship_down ] );
                        setMapa(aux);
                    }
                    else
                    {
                        if(here[0]+1<mapa.length && mapa[here[0]+1][here[1]]=='')
                        {
                            let aux = mapa;
                            aux[here[0]][here[1]]='';
                            aux[here[0]+1][here[1]]=ship_down;
                            setPlayer( [ here[0]+1, here[1], ship_down ] );
                            setMapa(aux);
                        }
                        else
                        {
                            if(here[0]+1<mapa.length && mapa[here[0]+1][here[1]]==asteroid)
                            {
                                auxiliar[here[0]][here[1]] = '';
                                auxiliar[here[0]+1][here[1]] = '💥';
                                death();
                                setScore( Number(score) - 20 );
                                auxiliar[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
                                setPlayer( [ Math.floor(mapa.length/2), Math.floor(mapa[0].length/2), ship_down ] );
                                setMapa(auxiliar);
                                boomAnimation(here[0]+1, 1, 0, here[1], 1);
                            }
                            else
                            {
                                auxiliar[here[0]][here[1]]=ship_down;
                                setPlayer( [ here[0], here[1], ship_down ] );
                                setMapa(auxiliar);
                            }
                        }
                    }
                    break;
                case 'D':
                case 'd':
                    if(event.shiftKey)
                    {
                        let aux = mapa;
                        aux[here[0]][here[1]]=ship_right;
                        setPlayer( [ here[0], here[1], ship_right ] );
                        setMapa(aux);
                    }
                    else
                    {
                        if(here[1]+1<mapa[0].length && mapa[here[0]][here[1]+1]=='')
                        {
                            let aux = mapa;
                            aux[here[0]][here[1]]='';
                            aux[here[0]][here[1]+1]=ship_right;
                            setPlayer( [ here[0], here[1]+1, ship_right ] );
                            setMapa(aux);
                        }
                        else
                        {
                            if(here[1]+1<mapa[0].length && mapa[here[0]][here[1]+1]==asteroid)
                            {
                                auxiliar[here[0]][here[1]] = '';
                                auxiliar[here[0]][here[1]+1] = '💥';
                                death();
                                setScore( Number(score) - 20 );
                                auxiliar[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
                                setPlayer( [ Math.floor(mapa.length/2), Math.floor(mapa[0].length/2), ship_down ] );
                                setMapa(auxiliar);
                                boomAnimation(here[0], 1, 0, here[1]+1, 1);
                            }
                            else
                            {
                                auxiliar[here[0]][here[1]]=ship_right;
                                setPlayer( [ here[0], here[1], ship_right ] );
                                setMapa(auxiliar);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }

    const shoot = (event: React.KeyboardEvent) =>
    {
        if(event.key==' ' && !dead)
        {
            let here = [ 0, 0 ];
            let symbol = ship_up;
            mapa.forEach( (fila, y) => fila.map( (celda, z) =>
            {
                if(celda==ship_down || celda==ship_up || celda==ship_left || celda==ship_right ) { here=[ y, z ]; symbol=celda; }
            } ));
            let playerLocation = [ here[0], here[1], symbol ];
            let movimiento = [ 0, 0, laser_right ];
            switch(player[2])
            {
                case ship_right:
                    movimiento = [ 0, 1, laser_right ];
                    break;
                case ship_left:
                    movimiento = [ 0, -1, laser_left ];
                    break;
                case ship_down:
                    movimiento = [ 1, 0, laser_down ];
                    break;
                case ship_up:
                    movimiento = [ -1, 0, laser_up ];
                    break;
            }
            shootMechanic(playerLocation, movimiento, true, 0);
            if
            (
                (Number(player[1]) + Number(movimiento[1]) < mapa[0].length && Number(player[1]) + Number(movimiento[1]) >= 0) &&   //check horizontal
                (Number(player[0]) + Number(movimiento[0]) < mapa.length && Number(player[0]) + Number(movimiento[0]) >= 0) &&      //check vertical
                (mapa[Number(player[0]) + Number(movimiento[0])][Number(player[1]) + Number(movimiento[1])]!='-' ||                 //check for a wall
                mapa[Number(player[0]) + Number(movimiento[0])][Number(player[1]) + Number(movimiento[1])]==asteroid )                  //check for an enemy
            )
            {
                let bulletAt = [ Number(player[0]) + Number(movimiento[0]), Number(player[1]) + Number(movimiento[1]) ];
                let c = 0;
                let shootIt = setInterval( () =>
                {
                    if(c==0)
                    {
                        let aux = [...mapa];
                        console.log(aux[bulletAt[0]][bulletAt[1]]);
                        if(aux[bulletAt[0]][bulletAt[1]]=="🌑")
                        {
                            aux[bulletAt[0]][bulletAt[1]] = '💥';
                            setMapa(aux);
                            c++;
                            clearInterval(shootIt);
                            setTimeout( () =>
                            {
                                let auxiliar = [ ...mapa];
                                auxiliar[bulletAt[0]][bulletAt[1]] = '';
                                setMapa(auxiliar);
                            }, 150);
                        }
                        else
                        {
                            aux[bulletAt[0]][bulletAt[1]] = String(movimiento[2]);
                            setMapa(aux);
                            c++;
                        }
                    }
                    else
                    {
                        if
                        (
                            (Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) < mapa.length && Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) >= 0) &&
                            (Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) < mapa[0].length && Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) >= 0) &&
                            (mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )]=='' ||
                            mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )]==asteroid)
                        )
                        {
                            let aux = mapa;
                            let objective = mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )];
                            if(objective=='')
                            {
                                if(movimiento[0]!=0)
                                {
                                    aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
                                    aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = String(movimiento[2]);
                                    c++;
                                    setMapa(aux);
                                }
                                else
                                {
                                    if(movimiento[1]!=0)
                                    {
                                        aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]='';
                                        aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ]= String(movimiento[2]);
                                        c++;
                                        setMapa(aux);
                                    }
                                }
                            }
                            else
                            {
                                if(objective==asteroid)
                                {
                                    if(movimiento[0]!=0)
                                    {
                                        aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
                                        aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = "💥";
                                        boomAnimation( bulletAt[0], c, movimiento[0] ,bulletAt[1], 1 );
                                        c++;
                                        setMapa(aux);
                                        clearInterval(shootIt);
                                    }
                                    else
                                    {
                                        if(movimiento[1]!=0)
                                        {
                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]='';
                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ]= "💥";
                                            boomAnimation( bulletAt[0], c, movimiento[1] ,bulletAt[1], 2 );
                                            c++;
                                            setMapa(aux);
                                            clearInterval(shootIt);
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            let aux = mapa;
                            if(movimiento[0]!=0)
                            {
                                aux[Number(bulletAt[0]) + ( (c - 1) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
                                c++;
                                setMapa(aux);
                                clearInterval(shootIt);
                            }
                            else
                            {
                                if(movimiento[1]!=0)
                                {
                                    aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( (c - 1) * Number(movimiento[1]) )]='';
                                    c++;
                                    setMapa(aux);
                                    clearInterval(shootIt);
                                }
                            }
                        }
                    }
                    c%2==0 && setClick(false);
                    c%2!=0 && setClick(true);
                    console.log("teoricamente esta ", click)
                }, 50)
            }
        }
    }

    const shootMechanic = (startingPoint: any, movimiento: any, aShoot: boolean, timer: number) =>
    {
        let aux = [ ...mapa];
        if
            (
                (Number(startingPoint[1]) + Number(movimiento[1]) < mapa[0].length && Number(startingPoint[1]) + Number(movimiento[1]) >= 0) && //check horizontal
                (Number(startingPoint[0]) + Number(movimiento[0]) < mapa.length && Number(player[0]) + Number(movimiento[0]) >= 0)           //check vertical
            )
            {
                let bulletAt = [ Number(startingPoint[0]) + Number(movimiento[0]), Number(startingPoint[1]) + Number(movimiento[1]) ];
                let c = 0;
                let shootIt = setInterval( () =>
                {
                    if(c==0)
                    {
                        let target = aux[bulletAt[0]][bulletAt[1]];
                        if( target==asteroid || target==ship_right || target==ship_left || target==ship_up || target==ship_down )
                        {
                            if(!aShoot && (target==ship_right || target==ship_left || target==ship_up || target==ship_down) && !dead)
                            {
                                aux[bulletAt[0]][bulletAt[1]] = '💥';
                                aux[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
                                setScore( Number(score) - 20 );
                                death();
                            }
                            else
                            {
                                if(!aShoot && (target==ship_right || target==ship_left || target==ship_up || target==ship_down) && dead)
                                {
                                    aux[startingPoint[0]][startingPoint[1]]='';
                                }
                                else
                                {
                                    if(aShoot && target==asteroid)
                                    {
                                        aux[bulletAt[0]][bulletAt[1]] = '💥';
                                        setScore( Number(score) + 10 );
                                    }
                                }
                            }
                            setMapa(aux);
                            c++;
                            setTimeout( () =>
                            {
                                let auxiliar = [ ...mapa];
                                auxiliar[bulletAt[0]][bulletAt[1]] = '';
                                setMapa(auxiliar);
                            }, 150);
                            clearInterval(shootIt);
                        }
                        else
                        {
                            aux[bulletAt[0]][bulletAt[1]] = String(movimiento[2]);
                            setMapa(aux);
                            c++;
                        }
                    }
                    else
                    {
                        if
                        (
                            (Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) < mapa.length && Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) >= 0) &&
                            (Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) < mapa[0].length && Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) >= 0) &&
                            mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )]!='-'
                        )
                        {
                            let objective = mapa[Number(bulletAt[0]) + (c * Number(movimiento[0]) )][Number(bulletAt[1]) + (c * Number(movimiento[1]) )];
                            if(objective=='')
                            {
                                if(movimiento[0]!=0)
                                {
                                    if( aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]=='' ||
                                        aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]=='💥' )
                                    {
                                        c++;
                                        clearInterval(shootIt);
                                    }
                                    else
                                    {
                                        aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])] = '';
                                        aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = String(movimiento[2]);
                                        c++;
                                        setMapa(aux);
                                    }
                                }
                                else
                                {
                                    if(movimiento[1]!=0)
                                    {
                                        if( aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]=='' ||
                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]=='💥')
                                        {
                                            c++;
                                            clearInterval(shootIt);
                                        }
                                        else
                                        {
                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )] = '';
                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ] = String(movimiento[2]);
                                            c++;
                                            setMapa(aux);
                                        }
                                    }
                                }
                            }
                            else
                            {
                                if( objective==asteroid || (objective==ship_right || objective==ship_left || objective==ship_up || objective==ship_down)
                                || (objective==laser_down || objective==laser_up || objective==laser_left || objective==laser_right) )
                                {
                                    if(movimiento[0]!=0)
                                    {
                                        if( aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]=='' ||
                                            aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]=='💥' )
                                        {
                                            c++;
                                            clearInterval(shootIt);
                                        }
                                        else
                                        {
                                            aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
                                            if( !aShoot && (objective==ship_right || objective==ship_left || objective==ship_up || objective==ship_down) )
                                            {
                                                setDead( prevDead =>
                                                {
                                                    console.log(prevDead);
                                                    if( !prevDead )
                                                    {
                                                        aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = "💥";
                                                        console.log("¡Te comió una luna!\nDead: ", prevDead?'true':'false' );
                                                        setScore( prevScore => prevScore - 20 );
                                                        aux[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
                                                        death();
                                                        boomAnimation( bulletAt[0], c, movimiento[0] ,bulletAt[1], 1 );
                                                        c++;
                                                        setMapa(aux);
                                                        clearInterval(shootIt);
                                                    }
                                                    else
                                                    {
                                                        console.log("Cometazo a invulnerable");
                                                        c++;
                                                        setMapa( aux );
                                                        clearInterval(shootIt);
                                                    }
                                                    return prevDead;
                                                } );
                                            }
                                            else
                                            {
                                                if(!aShoot && objective==asteroid)
                                                {
                                                    aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = "💥";
                                                    boomAnimation( bulletAt[0], c, movimiento[0] ,bulletAt[1], 1 );
                                                    c++;
                                                    setMapa(aux);
                                                    clearInterval(shootIt);
                                                }
                                            }
                                            if(aShoot && objective==asteroid || (!aShoot && (objective==laser_down || objective==laser_up || objective==laser_left || objective==laser_right)) )
                                            {
                                                aux[Number(bulletAt[0]) + ( c * Number(movimiento[0]) ) ][Number(bulletAt[1])] = "💥";
                                                setScore( prevScore => prevScore + 10 );
                                                boomAnimation( bulletAt[0], c, movimiento[0] ,bulletAt[1], 1 );
                                                c++;
                                                setMapa(aux);
                                                clearInterval(shootIt);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        if(movimiento[1]!=0)
                                        {
                                            if( aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]=='' ||
                                                aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )]=='💥')
                                            {
                                                c++;
                                                clearInterval(shootIt);
                                            }
                                            else
                                            {
                                                aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( ( c - 1 ) * Number(movimiento[1]) )] = '';
                                                if( !aShoot && (objective==ship_right || objective==ship_left || objective==ship_up || objective==ship_down) )
                                                {
                                                    setDead( prevDead =>
                                                    {
                                                        console.log(prevDead);
                                                        if( !prevDead )
                                                        {
                                                            aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ] = "💥";
                                                            console.log("¡Te comió una luna!\nScore previo: ", score, "\nNuevo: ", score - 20, "\nDead: ", prevDead?'true':'false' );
                                                            setScore( prevScore => prevScore - 20 );
                                                            aux[ Math.floor(mapa.length/2) ][ Math.floor(mapa[0].length/2) ] = ship_down;
                                                            death();
                                                            boomAnimation( bulletAt[0], c, movimiento[1] ,bulletAt[1], 2 );
                                                            c++;
                                                            setMapa(aux);
                                                            clearInterval(shootIt);
                                                        }
                                                        else
                                                        {
                                                            console.log("Cometazo a invulnerable");
                                                            c++;
                                                            setMapa( aux );
                                                            clearInterval(shootIt);
                                                        }
                                                        return prevDead;
                                                    });
                                                }
                                                else
                                                {
                                                    if(!aShoot && objective==asteroid)
                                                    {
                                                        aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ] = "💥";
                                                        boomAnimation( bulletAt[0], c, movimiento[1] ,bulletAt[1], 2 );
                                                        c++;
                                                        setMapa(aux);
                                                        clearInterval(shootIt);
                                                    }
                                                }
                                                if(aShoot && objective==asteroid || (!aShoot && (objective==laser_down || objective==laser_up || objective==laser_left || objective==laser_right)) )
                                                {
                                                    aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( c * Number(movimiento[1]) ) ] = "💥";
                                                    setScore( prevScore => prevScore  + 10 );
                                                    boomAnimation( bulletAt[0], c, movimiento[1] ,bulletAt[1], 2 );
                                                    c++;
                                                    setMapa(aux);
                                                    clearInterval(shootIt);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            let aux = [...mapa];
                            if(movimiento[0]!=0)
                            {
                                aux[Number(bulletAt[0]) + ( ( c - 1 ) * Number(movimiento[0]) ) ][Number(bulletAt[1])]='';
                                c++;
                                setMapa(aux);
                                clearInterval(shootIt);
                            }
                            else
                            {
                                if(movimiento[1]!=0)
                                {
                                    aux[Number(bulletAt[0])][Number(bulletAt[1]) + ( (c - 1) * Number(movimiento[1]) )]='';
                                    c++;
                                    setMapa(aux);
                                    clearInterval(shootIt);
                                }
                            }
                        }
                    }
                    c%2==0 && setClick(false);
                    c%2!=0 && setClick(true);
                }, aShoot ? 50 : timer );
            }
    }

    const shootAnAsteroid = (timer: number) =>
    {
        let random8 = Math.floor( Math.random() * ( 8 - 0 + 1 ) + 0 );
        let direction = Math.floor( Math.random() * ( 4 - 1 + 1 ) + 1 );
        let startingPoint = [ 0, 0 ];
        let movimiento = [ 0, 0, asteroid ];
        switch(direction)
        {
            case 1: //>
                startingPoint = [ random8, 0 ];
                movimiento = [ 0, 1, asteroid ];
                break;
            case 2: //<
                startingPoint = [ random8, 8 ];
                movimiento = [ 0, -1, asteroid ];
                break;
            case 3: //v
                startingPoint = [ 0, random8 ];
                movimiento = [ 1, 0, asteroid ];
                break;
            case 4: //^
                startingPoint = [ 8, random8 ];
                movimiento = [ -1, 0, asteroid  ];
                break;
        }
        shootMechanic( startingPoint, movimiento, false, timer );
    }

    const boomAnimation = ( bulletAt0: number, c: number, movimiento: any, bulletAt1: number , interaction: number) =>
    {
        let aux = [ ...mapa ];
        setTimeout( () =>
        {
            if(interaction == 1)
            {
                let objective = aux[Number(bulletAt0) + ( c * Number(movimiento) ) ][Number(bulletAt1)];
                if( !(objective==ship_right || objective==ship_left || objective==ship_up || objective==ship_down) )
                {
                    aux[Number(bulletAt0) + ( c * Number(movimiento) ) ][Number(bulletAt1)] = '';
                }
            }
            if(interaction == 2)
            {
                let objective = aux[Number(bulletAt0)][Number(bulletAt1) + ( c * Number(movimiento) ) ];
                if( !(objective==ship_right || objective==ship_left || objective==ship_up || objective==ship_down) )
                {
                    aux[Number(bulletAt0)][Number(bulletAt1) + ( c * Number(movimiento) ) ] = '';
                }
            }
            setMapa(aux);
            setClick(true);
            setClick(false);
        }, 100);
    }

    const death = () =>
    {
        setDead(true);
        go && setGo( false );
        setTimeout( () =>
        {
            setDead(false);
        },2100);

        let contador = 0;
        let timer = setInterval( () =>
        {
            setTimeLeft( prevTime => prevTime - 1 );
            contador++
            if(contador==3)
            {
                setTimeLeft( 3 );
                setGo( true );
                setTimeout( () =>
                {
                    setGo( false );
                },1000);
                clearInterval(timer);
            }
        }, 700)
    }

    const stopGame = () =>
    {
        clearInterval( startId );
        let aux = [ ...mapa];

        setShowEnd(true);
        setTimeout( () =>
        {
            setShowEnd(false);
        }, 3000)

        aux.map( (fila, x) => fila.map( (celda, y) => {if(celda==ship_right || celda==ship_left || celda==ship_up || celda==ship_down)
        {
            aux[x][y]='';
        }} ));
        setMapa(aux);
        setTotalScore( Number(score) + Number(totalScore) );
        setStartId( 0 );
    }

    return(
        <div>
            <div>
                <h1> SCORE: {score}</h1>
            </div>

            <div className='general'>
                {startId==0 && <img src={logo} className='logo'/>}
                {startId!=0 &&
                <div className='columna' onKeyDown={handleMovement} onKeyPress={shoot} tabIndex={0}>

                    {mapa.map( ( fila, x ) =>
                    <div key={x} className='fila'>
                        {fila.map( ( celda, y ) =>
                        {
                            let x = false;
                            let estilo = 'celda';
                            if(celda==ship_down || celda==ship_left || celda==ship_right || celda==ship_up || celda==asteroid ||
                                celda==laser_down || celda==laser_left || celda==laser_right || celda==laser_up )
                            {
                                x = true;
                            }

                            if(dead && x && celda!=asteroid)
                            {
                                estilo = 'titilar';
                            }

                            return(
                                <>
                                    { x && <img src={celda} key={y} className={estilo} /> }
                                    { !x && <label key={y} className='celda' >
                                                {celda}
                                            </label>}
                                </>
                            )
                        } )}
                    </div> )}

                </div>}

                {startId==0 &&
                <div className='columna' tabIndex={0}>

                    {mapa.map( ( fila, x ) =>
                    <div key={x} className='fila'>
                        {fila.map( ( celda, y ) =>
                        {
                            let x = false;
                            if(celda==ship_down || celda==ship_left || celda==ship_right || celda==ship_up || celda==asteroid ||
                                celda==laser_down || celda==laser_left || celda==laser_right || celda==laser_up )
                            {
                                x = true;
                            }

                            return(
                                <>
                                    { x && <img src={celda} key={y} className='celda' /> }
                                    { !x && <label key={y} className='celda' >
                                                {celda}
                                            </label>}
                                </>
                            )
                        } )}
                    </div> )}

                </div>}     
            </div>

            {startId==0 && <button onClick={startGame}> START </button>}
            {startId!=0 && <button onClick={stopGame}> STOP </button>}

            {showStart &&
            <div className='message'>
                ¡Buena suerte!
            </div>}

            {showEnd &&
            <div className='message'>
                ¡Buen juego!
            </div>}

            {dead &&
            <div className='ready'>
                - {timeLeft} -
            </div>}

            {go &&
            <div className='ready'>
                ¡Go!
            </div>}

            <div>
                <h5> Total coins: {totalScore} </h5>
            </div>
        </div>
    )
}

export default SpaceShooter;