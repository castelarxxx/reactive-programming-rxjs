import { switchMap, map, tap, filter, debounceTime, throwError, catchError, EMPTY, of } from 'rxjs';
import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = ''
  livrosResultado: LivrosResultado;
  

  constructor(private service: LivroService) { }
 
 

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
       debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap(() => console.log('Requisições ao servidor')),
    tap((retornoAPI) => console.log(retornoAPI)),
    map((items) => this.livrosResultadoParaLivros(items))
)

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}



function trhowError(arg0: () => Error) {
  throw new Error('Function not implemented.');
}
