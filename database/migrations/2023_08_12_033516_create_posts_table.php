<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            // use UUID for ID & set the default value to be unique
            $table->uuid('id')->unique()->primary();
            $table->text('content');
            $table->enum('post_type', ['wish', 'idea', 'attachment', 'confession']);
            // foreign key for post author
            $table->foreignId('author_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
