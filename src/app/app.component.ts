import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PasswordsTableComponent } from './components/passwords-table/passwords-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PasswordFormComponent,
    CommonModule,
    MatButtonModule,
    PasswordsTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-password-crud';

  showForm = false;
  showTable = false;

  togglePasswordForm(): void {
    this.showForm = !this.showForm;
    this.showTable = false; // Hide table if form is shown
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
    this.showForm = false; // Hide form if table is shown
  }
}
