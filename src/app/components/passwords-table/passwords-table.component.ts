import {
  Component,
  OnInit,
  signal,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-passwords-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './passwords-table.component.html',
  styleUrl: './passwords-table.component.css',
})
export class PasswordsTableComponent implements OnInit {
  @Output() closeTable = new EventEmitter<void>();

  http = inject(HttpClient);
  passwords = signal<any[]>([]);
  displayedColumns = [
    'select',
    'website',
    'email',
    'username',
    'password',
    'comments',
  ];
  selection = new SelectionModel<any>(true, []);

  showDelete = false;

  ngOnInit(): void {
    this.loadPasswords();
  }

  loadPasswords(): void {
    this.http.get<any[]>('/api/passwords').subscribe((data) => {
      this.passwords.set(data);
    });
  }

  saveAllPasswords(): void {
    this.http.put('/api/passwords', this.passwords()).subscribe(() => {
      console.log('Passwords updated successfully!');
      this.closeTable.emit();
    });
  }

  updateAllPasswords(): void {
    this.http.put('/api/passwords', this.passwords()).subscribe(() => {
      console.log('Passwords updated successfully!');
    });
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
  }

  toggleDelete() {
    this.showDelete = !this.showDelete;
  }

  deleteSelectedPasswords(): void {
    console.log('got here');
    const selectedPasswords = this.selection.selected;
    const remainingPasswords = this.passwords().filter(
      (password) => !selectedPasswords.includes(password)
    );
    this.passwords.set(remainingPasswords);
    this.updateAllPasswords();
    console.log('Passwords deleted successfully!');
  }
}
