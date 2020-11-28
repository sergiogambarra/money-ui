import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { HttpErrorResponse } from '@angular/common/http';
import { NotAuthenticatedError } from '../security/money-http-interceptor';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }


  handle(errorResponse: any){

    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    }

    else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não têm permissão para executar esta ação!';
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
    } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

  } else {
    msg = 'Erro ao processar serviço remoto. Tente novamente.';
    console.error('Ocorreu um erro', errorResponse);
  }

    this.toastr.error(msg);

  }
}
